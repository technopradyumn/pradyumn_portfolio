import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../../../../core/usecases/usecase.dart';
import '../entities/portfolio_section.dart';
import '../repositories/portfolio_repository.dart';

class GetExperience implements UseCase<List<Experience>, NoParams> {
  final PortfolioRepository repository;

  GetExperience(this.repository);

  @override
  Future<Either<Failure, List<Experience>>> call(NoParams params) async {
    return await repository.getExperience();
  }
}
