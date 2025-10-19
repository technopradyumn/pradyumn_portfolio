import 'package:flutter/foundation.dart';
import '../../../../core/errors/failures.dart';
import '../../../../core/usecases/usecase.dart';
import '../../domain/entities/portfolio_section.dart';
import '../../domain/usecases/get_awards.dart';
import '../../domain/usecases/get_experience.dart';
import '../../domain/usecases/get_personal_info.dart';
import '../../domain/usecases/get_projects.dart';
import '../../domain/usecases/get_skills.dart';

enum PortfolioState { initial, loading, loaded, error }

class PortfolioProvider with ChangeNotifier {
  final GetPersonalInfo getPersonalInfo;
  final GetSkills getSkills;
  final GetExperience getExperience;
  final GetProjects getProjects;
  final GetAwards getAwards;

  PortfolioProvider({
    required this.getPersonalInfo,
    required this.getSkills,
    required this.getExperience,
    required this.getProjects,
    required this.getAwards,
  });

  // State management
  PortfolioState _state = PortfolioState.initial;
  String _errorMessage = '';

  // Data
  PersonalInfo? _personalInfo;
  List<Skill> _skills = [];
  List<Experience> _experience = [];
  List<Project> _projects = [];
  List<Award> _awards = [];

  // Getters
  PortfolioState get state => _state;
  String get errorMessage => _errorMessage;
  PersonalInfo? get personalInfo => _personalInfo;
  List<Skill> get skills => _skills;
  List<Experience> get experience => _experience;
  List<Project> get projects => _projects;
  List<Award> get awards => _awards;

  bool get isLoading => _state == PortfolioState.loading;
  bool get hasError => _state == PortfolioState.error;
  bool get isLoaded => _state == PortfolioState.loaded;

  // Skills grouped by category
  Map<String, List<Skill>> get skillsByCategory {
    final Map<String, List<Skill>> grouped = {};
    for (final skill in _skills) {
      if (!grouped.containsKey(skill.category)) {
        grouped[skill.category] = [];
      }
      grouped[skill.category]!.add(skill);
    }
    return grouped;
  }

  // Current experience (if any)
  Experience? get currentExperience {
    try {
      return _experience.firstWhere((exp) => exp.isCurrent);
    } catch (e) {
      return null;
    }
  }

  // Load all portfolio data
  Future<void> loadPortfolioData() async {
    _setState(PortfolioState.loading);

    try {
      // Load all data concurrently
      final results = await Future.wait([
        getPersonalInfo(const NoParams()),
        getSkills(const NoParams()),
        getExperience(const NoParams()),
        getProjects(const NoParams()),
        getAwards(const NoParams()),
      ]);

      // Check for failures
      for (final result in results) {
        result.fold(
          (failure) => throw _mapFailureToMessage(failure),
          (data) => null,
        );
      }

      // Extract successful data
      results[0].fold((l) => null, (r) => _personalInfo = r as PersonalInfo);
      results[1].fold((l) => null, (r) => _skills = r as List<Skill>);
      results[2].fold((l) => null, (r) => _experience = r as List<Experience>);
      results[3].fold((l) => null, (r) => _projects = r as List<Project>);
      results[4].fold((l) => null, (r) => _awards = r as List<Award>);

      _setState(PortfolioState.loaded);
    } catch (e) {
      _errorMessage = e.toString();
      _setState(PortfolioState.error);
    }
  }

  // Load personal info only
  Future<void> loadPersonalInfo() async {
    final result = await getPersonalInfo(const NoParams());
    result.fold(
      (failure) {
        _errorMessage = _mapFailureToMessage(failure);
        _setState(PortfolioState.error);
      },
      (personalInfo) {
        _personalInfo = personalInfo;
        notifyListeners();
      },
    );
  }

  // Load skills only
  Future<void> loadSkills() async {
    final result = await getSkills(const NoParams());
    result.fold(
      (failure) {
        _errorMessage = _mapFailureToMessage(failure);
        _setState(PortfolioState.error);
      },
      (skills) {
        _skills = skills;
        notifyListeners();
      },
    );
  }

  // Load experience only
  Future<void> loadExperience() async {
    final result = await getExperience(const NoParams());
    result.fold(
      (failure) {
        _errorMessage = _mapFailureToMessage(failure);
        _setState(PortfolioState.error);
      },
      (experience) {
        _experience = experience;
        notifyListeners();
      },
    );
  }

  // Load projects only
  Future<void> loadProjects() async {
    final result = await getProjects(const NoParams());
    result.fold(
      (failure) {
        _errorMessage = _mapFailureToMessage(failure);
        _setState(PortfolioState.error);
      },
      (projects) {
        _projects = projects;
        notifyListeners();
      },
    );
  }

  // Retry loading data
  Future<void> retry() async {
    await loadPortfolioData();
  }

  // Private methods
  void _setState(PortfolioState newState) {
    _state = newState;
    notifyListeners();
  }

  String _mapFailureToMessage(Failure failure) {
    switch (failure.runtimeType) {
      case ServerFailure:
        return 'Server error occurred. Please try again later.';
      case CacheFailure:
        return 'Failed to load data from cache.';
      case NetworkFailure:
        return 'Network error. Please check your connection.';
      case ValidationFailure:
        return (failure as ValidationFailure).message;
      default:
        return 'An unexpected error occurred.';
    }
  }
}
