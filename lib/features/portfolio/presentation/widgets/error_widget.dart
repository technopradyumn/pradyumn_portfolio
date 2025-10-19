import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class PortfolioErrorWidget extends StatelessWidget {
  final String message;
  final VoidCallback onRetry;

  const PortfolioErrorWidget({
    super.key,
    required this.message,
    required this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Colors.red.withOpacity(0.1), Colors.red.withOpacity(0.05)],
          ),
        ),
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Error icon
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: Colors.red.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    FontAwesomeIcons.triangleExclamation,
                    size: 40,
                    color: Colors.red,
                  ),
                ),
                const SizedBox(height: 24),

                // Error title
                Text(
                  'Oops! Something went wrong',
                  style: GoogleFonts.poppins(
                    fontSize: 24,
                    fontWeight: FontWeight.w600,
                    color: Theme.of(context).textTheme.headlineSmall?.color,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 12),

                // Error message
                Text(
                  message,
                  style: GoogleFonts.poppins(
                    fontSize: 16,
                    color: Theme.of(
                      context,
                    ).textTheme.bodyLarge?.color?.withOpacity(0.7),
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 32),

                // Retry button
                ElevatedButton.icon(
                  onPressed: onRetry,
                  icon: const Icon(FontAwesomeIcons.arrowRotateRight, size: 18),
                  label: Text(
                    'Try Again',
                    style: GoogleFonts.poppins(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Theme.of(context).primaryColor,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24,
                      vertical: 12,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
