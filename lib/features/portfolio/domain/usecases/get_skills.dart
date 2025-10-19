import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../../../../core/usecases/usecase.dart';
import '../entities/portfolio_section.dart';
import '../repositories/portfolio_repository.dart';

class GetSkills implements UseCase<List<Skill>, NoParams> {
  final PortfolioRepository repository;

  GetSkills(this.repository);

  @override
  Future<Either<Failure, List<Skill>>> call(NoParams params) async {
    return await repository.getSkills();
  }
}
