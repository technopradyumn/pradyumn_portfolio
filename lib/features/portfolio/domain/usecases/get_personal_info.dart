import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../../../../core/usecases/usecase.dart';
import '../entities/portfolio_section.dart';
import '../repositories/portfolio_repository.dart';

class GetPersonalInfo implements UseCase<PersonalInfo, NoParams> {
  final PortfolioRepository repository;

  GetPersonalInfo(this.repository);

  @override
  Future<Either<Failure, PersonalInfo>> call(NoParams params) async {
    return await repository.getPersonalInfo();
  }
}
