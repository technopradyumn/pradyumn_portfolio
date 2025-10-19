import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../../../../core/usecases/usecase.dart';
import '../entities/portfolio_section.dart';
import '../repositories/portfolio_repository.dart';

class GetAwards implements UseCase<List<Award>, NoParams> {
  final PortfolioRepository repository;

  GetAwards(this.repository);

  @override
  Future<Either<Failure, List<Award>>> call(NoParams params) async {
    return await repository.getAwards();
  }
}
