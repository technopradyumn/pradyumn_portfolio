import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LoadingAnimationWidget extends StatefulWidget {
  const LoadingAnimationWidget({super.key});

  @override
  State<LoadingAnimationWidget> createState() => _LoadingAnimationWidgetState();
}

class _LoadingAnimationWidgetState extends State<LoadingAnimationWidget>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late AnimationController _rotationController;
  late AnimationController _fadeController;
  late Animation<double> _pulseAnimation;
  late Animation<double> _rotationAnimation;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();

    // Pulse animation for the logo
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(begin: 0.8, end: 1.2).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    // Rotation animation for the outer ring
    _rotationController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    _rotationAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _rotationController, curve: Curves.linear),
    );

    // Fade animation for the text
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.3, end: 1.0).animate(
      CurvedAnimation(parent: _fadeController, curve: Curves.easeInOut),
    );

    // Start animations
    _pulseController.repeat(reverse: true);
    _rotationController.repeat();
    _fadeController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _rotationController.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Animated logo/icon
            AnimatedBuilder(
              animation: Listenable.merge([
                _pulseAnimation,
                _rotationAnimation,
              ]),
              builder: (context, child) {
                return Transform.scale(
                  scale: _pulseAnimation.value,
                  child: Transform.rotate(
                    angle: _rotationAnimation.value * 2 * 3.14159,
                    child: Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: LinearGradient(
                          colors: [
                            Theme.of(context).primaryColor,
                            Theme.of(context).primaryColor.withOpacity(0.6),
                          ],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: Theme.of(
                              context,
                            ).primaryColor.withOpacity(0.3),
                            blurRadius: 20,
                            spreadRadius: 5,
                          ),
                        ],
                      ),
                      child: Icon(Icons.code, size: 60, color: Colors.white),
                    ),
                  ),
                );
              },
            ),

            const SizedBox(height: 40),

            // Animated loading text
            AnimatedBuilder(
              animation: _fadeAnimation,
              builder: (context, child) {
                return Opacity(
                  opacity: _fadeAnimation.value,
                  child: Column(
                    children: [
                      Text(
                        'Pradyumn Portfolio',
                        style: GoogleFonts.poppins(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Theme.of(context).primaryColor,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'Loading amazing experience...',
                        style: GoogleFonts.poppins(
                          fontSize: 16,
                          color: Theme.of(
                            context,
                          ).textTheme.bodyMedium?.color?.withOpacity(0.7),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),

            const SizedBox(height: 40),

            // Loading progress indicator
            SizedBox(
              width: 200,
              child: LinearProgressIndicator(
                backgroundColor: Theme.of(
                  context,
                ).primaryColor.withOpacity(0.2),
                valueColor: AlwaysStoppedAnimation<Color>(
                  Theme.of(context).primaryColor,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
