import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../../domain/entities/portfolio_section.dart';

class HeroSectionWidget extends StatelessWidget {
  final PersonalInfo personalInfo;

  const HeroSectionWidget({super.key, required this.personalInfo});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(
        horizontal: ResponsiveBreakpoints.of(context).isMobile ? 20 : 80,
        vertical: ResponsiveBreakpoints.of(context).isMobile ? 60 : 100,
      ),
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
      child: ResponsiveRowColumn(
        layout: ResponsiveBreakpoints.of(context).isMobile
            ? ResponsiveRowColumnType.COLUMN
            : ResponsiveRowColumnType.ROW,
        rowMainAxisAlignment: MainAxisAlignment.spaceBetween,
        rowCrossAxisAlignment: CrossAxisAlignment.center,
        columnMainAxisAlignment: MainAxisAlignment.center,
        columnCrossAxisAlignment: CrossAxisAlignment.center,
        children: [
          ResponsiveRowColumnItem(
            rowFlex: 1,
            child: _buildHeroContent(context),
          ),
          ResponsiveRowColumnItem(
            rowFlex: 1,
            child: _buildProfileImage(context),
          ),
        ],
      ),
    );
  }

  Widget _buildHeroContent(BuildContext context) {
    return Column(
      crossAxisAlignment: ResponsiveBreakpoints.of(context).isMobile
          ? CrossAxisAlignment.center
          : CrossAxisAlignment.start,
      children: [
        Container(
          alignment: ResponsiveBreakpoints.of(context).isMobile
              ? Alignment.center
              : Alignment.centerLeft,
          child: AnimatedTextKit(
            animatedTexts: [
              TypewriterAnimatedText(
                'Hi, I\'m ',
                textStyle: GoogleFonts.poppins(
                  fontSize: ResponsiveBreakpoints.of(context).isMobile
                      ? 32
                      : 48,
                  fontWeight: FontWeight.bold,
                  color: Theme.of(context).textTheme.headlineLarge?.color,
                ),
                speed: const Duration(milliseconds: 150),
              ),
            ],
            totalRepeatCount: 1,
            displayFullTextOnTap: true,
            isRepeatingAnimation: false,
            onFinished: () {},
          ),
        ),

        // Animated Name with special effects
        Container(
          alignment: ResponsiveBreakpoints.of(context).isMobile
              ? Alignment.center
              : Alignment.centerLeft,
          child: AnimatedTextKit(
            animatedTexts: [
              ColorizeAnimatedText(
                personalInfo.name,
                textAlign: TextAlign.center,
                textStyle: GoogleFonts.poppins(
                  fontSize: ResponsiveBreakpoints.of(context).isMobile
                      ? 36
                      : 52,
                  fontWeight: FontWeight.bold,
                ),
                colors: [
                  Theme.of(context).primaryColor,
                  Colors.purple,
                  Colors.deepPurple,
                  Theme.of(context).primaryColor,
                ],
                speed: const Duration(milliseconds: 200),
              ),
            ],
            totalRepeatCount: 2,
            pause: const Duration(milliseconds: 1000),
            displayFullTextOnTap: true,
          ),
        ),
        const SizedBox(height: 16),

        // Animated text for roles
        SizedBox(
          height: 80,
          child: AnimatedTextKit(
            animatedTexts: [
              TypewriterAnimatedText(
                personalInfo.title,
                textStyle: GoogleFonts.poppins(
                  fontSize: ResponsiveBreakpoints.of(context).isMobile
                      ? 20
                      : 28,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).primaryColor,
                ),
                speed: const Duration(milliseconds: 100),
              ),

              TypewriterAnimatedText(
                'Mobile Application Developer',
                textStyle: GoogleFonts.poppins(
                  fontSize: ResponsiveBreakpoints.of(context).isMobile
                      ? 20
                      : 28,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).primaryColor,
                ),
                speed: const Duration(milliseconds: 100),
              ),
            ],
            totalRepeatCount: 4,
            pause: const Duration(milliseconds: 1000),
            displayFullTextOnTap: true,
            stopPauseOnTap: true,
          ),
        ),

        const SizedBox(height: 32),

        // Social links and Resume button
        Row(
          mainAxisAlignment: ResponsiveBreakpoints.of(context).isMobile
              ? MainAxisAlignment.center
              : MainAxisAlignment.start,
          children: [Expanded(child: _buildSocialLinks(context))],
        ),
      ],
    );
  }

  Widget _buildProfileImage(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(
        top: ResponsiveBreakpoints.of(context).isMobile ? 40 : 0,
        left: ResponsiveBreakpoints.of(context).isMobile ? 0 : 40,
      ),
      child: Center(
        child: Image.asset(
          'assets/images/profile_picture_0.png',
          width: ResponsiveBreakpoints.of(context).isMobile ? 250 : 350,
          height: ResponsiveBreakpoints.of(context).isMobile ? 250 : 350,
          fit: BoxFit.contain,
          errorBuilder: (context, error, stackTrace) {
            return Container(
              width: ResponsiveBreakpoints.of(context).isMobile ? 250 : 350,
              height: ResponsiveBreakpoints.of(context).isMobile ? 250 : 350,
              color: Theme.of(context).primaryColor.withOpacity(0.1),
              child: Icon(
                FontAwesomeIcons.user,
                size: 80,
                color: Theme.of(context).primaryColor,
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildSocialLinks(BuildContext context) {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      alignment: ResponsiveBreakpoints.of(context).isMobile
          ? WrapAlignment.center
          : WrapAlignment.start,
      children: personalInfo.socialLinks.entries.map((entry) {
        return _buildSocialIcon(context, entry.key, entry.value);
      }).toList(),
    );
  }

  Widget _buildSocialIcon(BuildContext context, String platform, String url) {
    IconData iconData;
    switch (platform.toLowerCase()) {
      case 'github':
        iconData = FontAwesomeIcons.github;
        break;
      case 'linkedin':
        iconData = FontAwesomeIcons.linkedin;
        break;
      case 'twitter':
        iconData = FontAwesomeIcons.twitter;
        break;
      case 'instagram':
        iconData = FontAwesomeIcons.instagram;
        break;
      case 'leetcode':
        iconData = FontAwesomeIcons.code;
        break;
      case 'hackerrank':
        iconData = FontAwesomeIcons.hackerrank;
        break;
      default:
        iconData = FontAwesomeIcons.link;
    }

    return InkWell(
      onTap: () => _launchUrl(url),
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          border: Border.all(
            color: Theme.of(context).colorScheme.primary,
            width: 2,
          ),
          borderRadius: BorderRadius.circular(8),
        ),
        child: FaIcon(
          iconData,
          color: Theme.of(context).colorScheme.primary,
          size: 20,
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
