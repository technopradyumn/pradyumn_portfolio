import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PortfolioLoadingWidget extends StatelessWidget {
  const PortfolioLoadingWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Theme.of(context).primaryColor.withOpacity(0.1),
              Theme.of(context).primaryColor.withOpacity(0.05),
            ],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Animated loading indicator
              SizedBox(
                width: 80,
                height: 80,
                child: CircularProgressIndicator(
                  strokeWidth: 3,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    Theme.of(context).primaryColor,
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Loading text
              Text(
                'Loading Portfolio...',
                style: GoogleFonts.poppins(
                  fontSize: 18,
                  fontWeight: FontWeight.w500,
                  color: Theme.of(context).textTheme.bodyLarge?.color,
                ),
              ),
              const SizedBox(height: 8),

              // Subtitle
              Text(
                'Please wait while we prepare everything for you',
                style: GoogleFonts.poppins(
                  fontSize: 14,
                  color: Theme.of(
                    context,
                  ).textTheme.bodyMedium?.color?.withOpacity(0.7),
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
