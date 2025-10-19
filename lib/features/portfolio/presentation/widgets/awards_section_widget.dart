import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../../domain/entities/portfolio_section.dart';

class AwardsSectionWidget extends StatelessWidget {
  final List<Award> awards;

  const AwardsSectionWidget({super.key, required this.awards});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(
        horizontal: ResponsiveBreakpoints.of(context).isMobile ? 20 : 80,
        vertical: ResponsiveBreakpoints.of(context).isMobile ? 60 : 80,
      ),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Theme.of(context).scaffoldBackgroundColor,
            Theme.of(context).primaryColor.withOpacity(0.05),
          ],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Section title
          Text(
            'Awards & Recognition',
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

          // Awards timeline
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 800),
            child: Column(
              children: awards.asMap().entries.map((entry) {
                int index = entry.key;
                Award award = entry.value;
                bool isLast = index == awards.length - 1;
                return _buildAwardItem(context, award, isLast);
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAwardItem(BuildContext context, Award award, bool isLast) {
    return Container(
      margin: const EdgeInsets.only(bottom: 32),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Timeline indicator
          Column(
            children: [
              Container(
                width: 20,
                height: 20,
                decoration: BoxDecoration(
                  color: Theme.of(context).primaryColor,
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Theme.of(context).scaffoldBackgroundColor,
                    width: 3,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Theme.of(context).primaryColor.withOpacity(0.3),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: const Icon(
                  FontAwesomeIcons.trophy,
                  size: 10,
                  color: Colors.white,
                ),
              ),
              if (!isLast)
                Container(
                  width: 2,
                  height: 80,
                  color: Theme.of(context).primaryColor.withOpacity(0.3),
                ),
            ],
          ),

          const SizedBox(width: 24),

          // Award content
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Theme.of(context).cardColor,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: Theme.of(context).primaryColor.withOpacity(0.3),
                ),
                boxShadow: [
                  BoxShadow(
                    color: Theme.of(context).shadowColor.withOpacity(0.1),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Award title
                  Text(
                    award.title,
                    style: GoogleFonts.poppins(
                      fontSize: ResponsiveBreakpoints.of(context).isMobile
                          ? 18
                          : 20,
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).textTheme.titleLarge?.color,
                    ),
                  ),
                  const SizedBox(height: 4),

                  // Organization
                  Text(
                    award.organization,
                    style: GoogleFonts.poppins(
                      fontSize: ResponsiveBreakpoints.of(context).isMobile
                          ? 16
                          : 18,
                      fontWeight: FontWeight.w600,
                      color: Theme.of(context).primaryColor,
                    ),
                  ),
                  const SizedBox(height: 8),

                  // Date
                  Row(
                    children: [
                      Icon(
                        FontAwesomeIcons.calendar,
                        size: 14,
                        color: Theme.of(
                          context,
                        ).textTheme.bodyMedium?.color?.withOpacity(0.6),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        award.date,
                        style: GoogleFonts.poppins(
                          fontSize: 14,
                          color: Theme.of(
                            context,
                          ).textTheme.bodyMedium?.color?.withOpacity(0.8),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Description
                  Text(
                    award.description,
                    style: GoogleFonts.poppins(
                      fontSize: 14,
                      height: 1.6,
                      color: Theme.of(
                        context,
                      ).textTheme.bodyMedium?.color?.withOpacity(0.8),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
