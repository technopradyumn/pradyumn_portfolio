import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/splash_provider.dart';
import '../pages/portfolio_page.dart';
import 'loading_animation_widget.dart';

class SplashWrapper extends StatelessWidget {
  const SplashWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<SplashProvider>(
      builder: (context, splashProvider, child) {
        if (splashProvider.isLoading) {
          return const LoadingAnimationWidget();
        } else if (splashProvider.showMainApp) {
          return AnimatedSwitcher(
            duration: const Duration(milliseconds:300),
            transitionBuilder: (Widget child, Animation<double> animation) {
              return FadeTransition(
                opacity: animation,
                child: SlideTransition(
                  position:
                      Tween<Offset>(
                        begin: const Offset(0.0, 0.1),
                        end: Offset.zero,
                      ).animate(
                        CurvedAnimation(
                          parent: animation,
                          curve: Curves.easeOutCubic,
                        ),
                      ),
                  child: child,
                ),
              );
            },
            child: const PortfolioPage(),
          );
        } else {
          // Transition state - show a brief fade out of loading
          return AnimatedOpacity(
            opacity: 0.0,
            duration: const Duration(milliseconds: 300),
            child: const LoadingAnimationWidget(),
          );
        }
      },
    );
  }
}
