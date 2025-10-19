import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../domain/entities/portfolio_section.dart';

class ContactSectionWidget extends StatelessWidget {
  final PersonalInfo personalInfo;

  const ContactSectionWidget({super.key, required this.personalInfo});

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
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
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
            'Get In Touch',
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

          const SizedBox(height: 24),

          // Contact description
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 600),
            child: Text(
              'I\'m always open to discussing new opportunities, interesting projects, or just having a chat about technology. Feel free to reach out!',
              style: GoogleFonts.poppins(
                fontSize: ResponsiveBreakpoints.of(context).isMobile ? 16 : 18,
                height: 1.6,
                color: Theme.of(
                  context,
                ).textTheme.bodyLarge?.color?.withOpacity(0.8),
              ),
              textAlign: TextAlign.center,
            ),
          ),

          const SizedBox(height: 40),

          // Contact methods
          ResponsiveRowColumn(
            layout: ResponsiveBreakpoints.of(context).isMobile
                ? ResponsiveRowColumnType.COLUMN
                : ResponsiveRowColumnType.ROW,
            rowMainAxisAlignment: MainAxisAlignment.center,
            columnMainAxisAlignment: MainAxisAlignment.center,
            rowSpacing: 32,
            columnSpacing: 24,
            children: [
              ResponsiveRowColumnItem(
                child: _buildContactCard(
                  context,
                  'Email',
                  personalInfo.email,
                  FontAwesomeIcons.envelope,
                  () => _launchEmail(personalInfo.email),
                ),
              ),
              ResponsiveRowColumnItem(
                child: _buildContactCard(
                  context,
                  'Phone',
                  personalInfo.phone,
                  FontAwesomeIcons.phone,
                  () => _launchPhone(personalInfo.phone),
                ),
              ),
              ResponsiveRowColumnItem(
                child: _buildContactCard(
                  context,
                  'Location',
                  personalInfo.location,
                  FontAwesomeIcons.locationDot,
                  null,
                ),
              ),
            ],
          ),

          const SizedBox(height: 40),

          // Social links
          Text(
            'Connect with me',
            style: GoogleFonts.poppins(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: Theme.of(context).textTheme.titleMedium?.color,
            ),
          ),

          const SizedBox(height: 20),

          // Social icons
          Wrap(
            spacing: 16,
            runSpacing: 16,
            alignment: WrapAlignment.center,
            children: personalInfo.socialLinks.entries.map((entry) {
              return _buildSocialIcon(context, entry.key, entry.value);
            }).toList(),
          ),

          const SizedBox(height: 40),

          // Footer
          Container(
            padding: const EdgeInsets.symmetric(vertical: 20),
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(
                  color: Theme.of(context).dividerColor.withOpacity(0.3),
                ),
              ),
            ),
            child: Text(
              '© ${DateTime.now().year} ${personalInfo.name}. Built with Flutter 💙',
              style: GoogleFonts.poppins(
                fontSize: 14,
                color: Theme.of(
                  context,
                ).textTheme.bodyMedium?.color?.withOpacity(0.6),
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContactCard(
    BuildContext context,
    String title,
    String value,
    IconData icon,
    VoidCallback? onTap,
  ) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        width: ResponsiveBreakpoints.of(context).isMobile
            ? double.infinity
            : 250,
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: Theme.of(context).primaryColor.withOpacity(0.2),
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
          children: [
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                icon,
                size: 24,
                color: Theme.of(context).primaryColor,
              ),
            ),
            const SizedBox(height: 16),

            Text(
              title,
              style: GoogleFonts.poppins(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: Theme.of(context).textTheme.titleMedium?.color,
              ),
            ),
            const SizedBox(height: 8),

            Text(
              value,
              style: GoogleFonts.poppins(
                fontSize: 14,
                color: Theme.of(
                  context,
                ).textTheme.bodyMedium?.color?.withOpacity(0.8),
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
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
      case 'leetcode':
        iconData = FontAwesomeIcons.code;
        break;
      case 'hackerrank':
        iconData = FontAwesomeIcons.hackerrank;
        break;
      case 'twitter':
        iconData = FontAwesomeIcons.twitter;
        break;
      case 'instagram':
        iconData = FontAwesomeIcons.instagram;
        break;
      default:
        iconData = FontAwesomeIcons.link;
    }

    return InkWell(
      onTap: () => _launchUrl(url),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Theme.of(context).primaryColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Theme.of(context).primaryColor.withOpacity(0.3),
          ),
        ),
        child: Icon(iconData, size: 24, color: Theme.of(context).primaryColor),
      ),
    );
  }

  Future<void> _launchUrl(String url) async {
    final Uri uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  Future<void> _launchEmail(String email) async {
    final Uri uri = Uri.parse('mailto:$email');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  Future<void> _launchPhone(String phone) async {
    final Uri uri = Uri.parse('tel:$phone');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }
}
