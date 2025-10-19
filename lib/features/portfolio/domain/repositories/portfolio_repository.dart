import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../entities/portfolio_section.dart';

abstract class PortfolioRepository {
  Future<Either<Failure, PersonalInfo>> getPersonalInfo();
  Future<Either<Failure, List<Skill>>> getSkills();
  Future<Either<Failure, List<Experience>>> getExperience();
  Future<Either<Failure, List<Project>>> getProjects();
  Future<Either<Failure, List<Award>>> getAwards();
  Future<Either<Failure, List<PortfolioSection>>> getAllSections();
  Future<Either<Failure, bool>> updateSectionVisibility(
    String sectionId,
    bool isVisible,
  );
}
