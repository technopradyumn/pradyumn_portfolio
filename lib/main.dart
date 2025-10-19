import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'core/utils/injection_container.dart' as di;
import 'features/portfolio/presentation/providers/portfolio_provider.dart';
import 'features/portfolio/presentation/providers/splash_provider.dart';
import 'features/portfolio/presentation/pages/portfolio_page.dart';
import 'features/portfolio/presentation/widgets/loading_animation_widget.dart';
import 'features/portfolio/presentation/widgets/splash_wrapper.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await di.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) => PortfolioProvider(
            getPersonalInfo: di.sl(),
            getSkills: di.sl(),
            getExperience: di.sl(),
            getProjects: di.sl(),
            getAwards: di.sl(),
          ),
        ),
        ChangeNotifierProvider(create: (context) => SplashProvider()),
      ],
      child: MaterialApp(
        title: 'Pradyumn Portfolio',
        debugShowCheckedModeBanner: false,
        theme: _buildTheme(),
        builder: (context, child) => ResponsiveBreakpoints.builder(
          child: child!,
          breakpoints: [
            const Breakpoint(start: 0, end: 450, name: MOBILE),
            const Breakpoint(start: 451, end: 800, name: TABLET),
            const Breakpoint(start: 801, end: 1920, name: DESKTOP),
            const Breakpoint(start: 1921, end: double.infinity, name: '4K'),
          ],
        ),
        home: const SplashWrapper(),
      ),
    );
  }

  ThemeData _buildTheme() {
    const Color royalPurple = Color(0xFF6C3BAA);

    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: royalPurple,
        brightness: Brightness.light,
      ),
      primaryColor: royalPurple,
      scaffoldBackgroundColor: Colors.white,
      cardColor: Colors.white,
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: royalPurple,
          foregroundColor: Colors.white,
          elevation: 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
      ),
    );
  }
}
