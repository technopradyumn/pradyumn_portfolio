import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:responsive_framework/responsive_framework.dart';
import '../../domain/entities/portfolio_section.dart';

class AboutSectionWidget extends StatelessWidget {
  final PersonalInfo personalInfo;

  const AboutSectionWidget({super.key, required this.personalInfo});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(
        horizontal: ResponsiveBreakpoints.of(context).isMobile ? 20 : 80,
        vertical: ResponsiveBreakpoints.of(context).isMobile ? 60 : 80,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Section title
          Text(
            'About Me',
            style: GoogleFonts.poppins(
              fontSize: ResponsiveBreakpoints.of(context).isMobile ? 28 : 36,
              fontWeight: FontWeight.bold,
              color: Theme.of(context).textTheme.headlineLarge?.color,
            ),
          ),
          const SizedBox(height: 16),

          // Divider
          Container(
            width: 60,
            height: 4,
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor,
              borderRadius: BorderRadius.circular(2),
            ),
          ),

          const SizedBox(height: 40),

          // Content
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 800),
            child: Text(
              personalInfo.description,
              style: GoogleFonts.poppins(
                fontSize: ResponsiveBreakpoints.of(context).isMobile ? 16 : 18,
                height: 1.8,
                color: Theme.of(
                  context,
                ).textTheme.bodyLarge?.color?.withOpacity(0.8),
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}
