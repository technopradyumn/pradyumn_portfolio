import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../../domain/entities/portfolio_section.dart';
import '../../domain/repositories/portfolio_repository.dart';
import '../datasources/portfolio_local_data_source.dart';

class PortfolioRepositoryImpl implements PortfolioRepository {
  final PortfolioLocalDataSource localDataSource;

  PortfolioRepositoryImpl({required this.localDataSource});

  @override
  Future<Either<Failure, PersonalInfo>> getPersonalInfo() async {
    try {
      final personalInfo = await localDataSource.getPersonalInfo();
      return Right(personalInfo);
    } catch (e) {
      return Left(CacheFailure());
    }
  }

  @override
  Future<Either<Failure, List<Skill>>> getSkills() async {
    try {
      final skills = await localDataSource.getSkills();
      return Right(skills);
    } catch (e) {
      return Left(CacheFailure());
    }
  }

  @override
  Future<Either<Failure, List<Experience>>> getExperience() async {
    try {
      final experience = await localDataSource.getExperience();
      return Right(experience);
    } catch (e) {
      return Left(CacheFailure());
    }
  }

  @override
  Future<Either<Failure, List<Project>>> getProjects() async {
    try {
      final projects = await localDataSource.getProjects();
      return Right(projects);
    } catch (e) {
      return Left(CacheFailure());
    }
  }

  @override
  Future<Either<Failure, List<Award>>> getAwards() async {
    try {
      final awards = await localDataSource.getAwards();
      return Right(awards);
    } catch (e) {
      return Left(CacheFailure());
    }
  }

  @override
  Future<Either<Failure, List<PortfolioSection>>> getAllSections() async {
    try {
      // This is a placeholder implementation
      // In a real app, you might have a separate data source for sections
      final sections = [
        const PortfolioSection(
          id: 'hero',
          title: 'Hero Section',
          content: 'Main introduction section',
          isVisible: true,
        ),
        const PortfolioSection(
          id: 'about',
          title: 'About Me',
          content: 'Personal information and background',
          isVisible: true,
        ),
        const PortfolioSection(
          id: 'skills',
          title: 'Skills',
          content: 'Technical skills and proficiencies',
          isVisible: true,
        ),
        const PortfolioSection(
          id: 'experience',
          title: 'Experience',
          content: 'Work experience and career history',
          isVisible: true,
        ),
        const PortfolioSection(
          id: 'projects',
          title: 'Projects',
          content: 'Portfolio of completed projects',
          isVisible: true,
        ),
        const PortfolioSection(
          id: 'contact',
          title: 'Contact',
          content: 'Contact information and social links',
          isVisible: true,
        ),
      ];
      return Right(sections);
    } catch (e) {
      return Left(CacheFailure());
    }
  }

  @override
  Future<Either<Failure, bool>> updateSectionVisibility(
    String sectionId,
    bool isVisible,
  ) async {
    try {
      // This would typically update local storage or send to a server
      // For now, we'll just simulate success
      await Future.delayed(const Duration(milliseconds: 200));
      return const Right(true);
    } catch (e) {
      return Left(CacheFailure());
    }
  }
}
