import 'package:get_it/get_it.dart';
import '../../features/portfolio/data/datasources/portfolio_local_data_source.dart';
import '../../features/portfolio/data/repositories/portfolio_repository_impl.dart';
import '../../features/portfolio/domain/repositories/portfolio_repository.dart';
import '../../features/portfolio/domain/usecases/get_awards.dart';
import '../../features/portfolio/domain/usecases/get_experience.dart';
import '../../features/portfolio/domain/usecases/get_personal_info.dart';
import '../../features/portfolio/domain/usecases/get_projects.dart';
import '../../features/portfolio/domain/usecases/get_skills.dart';
// Note: PortfolioProvider will be registered in main.dart using ChangeNotifierProvider

final sl = GetIt.instance;

Future<void> init() async {
  //! Features - Portfolio
  // Use cases
  sl.registerLazySingleton(() => GetPersonalInfo(sl()));
  sl.registerLazySingleton(() => GetSkills(sl()));
  sl.registerLazySingleton(() => GetExperience(sl()));
  sl.registerLazySingleton(() => GetProjects(sl()));
  sl.registerLazySingleton(() => GetAwards(sl()));

  // Repository
  sl.registerLazySingleton<PortfolioRepository>(
    () => PortfolioRepositoryImpl(localDataSource: sl()),
  );

  // Data sources
  sl.registerLazySingleton<PortfolioLocalDataSource>(
    () => PortfolioLocalDataSourceImpl(),
  );
}
