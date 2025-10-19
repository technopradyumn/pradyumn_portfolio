import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../../../../core/usecases/usecase.dart';
import '../entities/portfolio_section.dart';
import '../repositories/portfolio_repository.dart';

class GetProjects implements UseCase<List<Project>, NoParams> {
  final PortfolioRepository repository;

  GetProjects(this.repository);

  @override
  Future<Either<Failure, List<Project>>> call(NoParams params) async {
    return await repository.getProjects();
  }
}
