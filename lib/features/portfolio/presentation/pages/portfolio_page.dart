import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:responsive_framework/responsive_framework.dart';
import '../providers/portfolio_provider.dart';
import '../widgets/hero_section_widget.dart';
import '../widgets/about_section_widget.dart';
import '../widgets/skills_section_widget.dart';
import '../widgets/experience_section_widget.dart';
import '../widgets/projects_section_widget.dart';
import '../widgets/awards_section_widget.dart';
import '../widgets/contact_section_widget.dart';

import '../widgets/error_widget.dart';
import '../widgets/scroll_animation_widget.dart';

class PortfolioPage extends StatefulWidget {
  const PortfolioPage({super.key});

  @override
  State<PortfolioPage> createState() => _PortfolioPageState();
}

class _PortfolioPageState extends State<PortfolioPage> {
  @override
  void initState() {
    super.initState();
    // Load portfolio data when the page initializes
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<PortfolioProvider>().loadPortfolioData();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<PortfolioProvider>(
        builder: (context, portfolioProvider, child) {
          if (portfolioProvider.hasError) {
            return PortfolioErrorWidget(
              message: portfolioProvider.errorMessage,
              onRetry: () => portfolioProvider.retry(),
            );
          }

          if (portfolioProvider.isLoaded) {
            return Stack(
              children: [
                SingleChildScrollView(
                  child: Column(
                    children: [
                      // Hero Section (no animation for immediate impact)
                      if (portfolioProvider.personalInfo != null)
                        HeroSectionWidget(
                          personalInfo: portfolioProvider.personalInfo!,
                        ),

                      // About Section
                      if (portfolioProvider.personalInfo != null)
                        ScrollAnimationWidget(
                          uniqueKey: 'about_section',
                          child: AboutSectionWidget(
                            personalInfo: portfolioProvider.personalInfo!,
                          ),
                        ),

                      // Skills Section
                      if (portfolioProvider.skills.isNotEmpty)
                        ScrollAnimationWidget(
                          uniqueKey: 'skills_section',
                          delay: const Duration(milliseconds: 200),
                          child: SkillsSectionWidget(
                            // skillsByCategory: portfolioProvider.skillsByCategory,
                          ),
                        ),

                      // Experience Section
                      if (portfolioProvider.experience.isNotEmpty)
                        ScrollAnimationWidget(
                          uniqueKey: 'experience_section',
                          delay: const Duration(milliseconds: 400),
                          child: ExperienceSectionWidget(
                            experiences: experiences,
                          ),
                        ),

                      // Projects Section
                      if (portfolioProvider.projects.isNotEmpty)
                        ScrollAnimationWidget(
                          uniqueKey: 'projects_section',
                          delay: const Duration(milliseconds: 600),
                          child: ProjectsSectionWidget(
                            projects: portfolioProvider.projects,
                          ),
                        ),

                      // Awards Section
                      if (portfolioProvider.awards.isNotEmpty)
                        ScrollAnimationWidget(
                          uniqueKey: 'awards_section',
                          delay: const Duration(milliseconds: 600),
                          child: AwardsSectionWidget(
                            awards: portfolioProvider.awards,
                          ),
                        ),

                      // Contact Section
                      if (portfolioProvider.personalInfo != null)
                        ScrollAnimationWidget(
                          uniqueKey: 'contact_section',
                          delay: const Duration(milliseconds: 600),
                          child: ContactSectionWidget(
                            personalInfo: portfolioProvider.personalInfo!,
                          ),
                        ),
                    ],
                  ),
                ),

                // Floating Resume Button
                Positioned(
                  top: 20,
                  right: 20,
                  child: _buildFloatingResumeButton(context),
                ),
              ],
            );
          }

          // Initial state
          return const SizedBox.shrink();
        },
      ),
    );
  }

  Widget _buildFloatingResumeButton(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Theme.of(context).primaryColor.withOpacity(0.3),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ElevatedButton.icon(
        onPressed: () => _launchUrl(
          'https://drive.google.com/file/d/1zuiPJbuZE2xbHY4n9fkd5948-v3Ru4NR/view?usp=drive_link',
        ),
        icon: const FaIcon(FontAwesomeIcons.download, size: 16),
        label: Text(
          ResponsiveBreakpoints.of(context).isMobile ? 'CV' : 'Resume',
          style: GoogleFonts.poppins(
            fontWeight: FontWeight.w600,
            fontSize: ResponsiveBreakpoints.of(context).isMobile ? 14 : 16,
          ),
        ),
        style: ElevatedButton.styleFrom(
          backgroundColor: Theme.of(context).primaryColor,
          foregroundColor: Colors.white,
          padding: EdgeInsets.symmetric(
            horizontal: ResponsiveBreakpoints.of(context).isMobile ? 16 : 24,
            vertical: ResponsiveBreakpoints.of(context).isMobile ? 10 : 12,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          elevation: 0,
        ),
      ),
    );
  }

  Future<void> _launchUrl(String url) async {
    final Uri uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }
}
