import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../domain/entities/portfolio_section.dart';

class ProjectsSectionWidget extends StatelessWidget {
  final List<Project> projects;

  const ProjectsSectionWidget({super.key, required this.projects});

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
            'Projects',
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

          // Projects grid
          LayoutBuilder(
            builder: (context, constraints) {
              final isMobile = ResponsiveBreakpoints.of(context).isMobile;
              final crossAxisCount = isMobile
                  ? 1
                  : (constraints.maxWidth > 800 ? 3 : 2);

              return GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  mainAxisSpacing: 24,
                  crossAxisSpacing: 24,
                  childAspectRatio: isMobile ? 1.0 : 0.8,
                ),
                itemCount: projects.length,
                itemBuilder: (context, index) {
                  return _buildProjectCard(context, projects[index]);
                },
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildProjectCard(BuildContext context, Project project) {
    return Container(
      padding: EdgeInsets.all(6.0),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: Theme.of(context).primaryColor.withOpacity(0.2),
        ),
        boxShadow: [
          BoxShadow(
            color: Theme.of(context).shadowColor.withOpacity(0.1),
            blurRadius: 12,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Project image
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            child: Container(
              height: 100,
              width: double.infinity,
              margin: EdgeInsets.all(6.0,),
              child: project.imageUrl != null
                  ? Image.asset(
                      project.imageUrl!,
                      width: double.infinity,
                      height: 100,
                      fit: BoxFit.contain,
                      errorBuilder: (context, error, stackTrace) {
                        return _buildPlaceholderImage(context);
                      },
                    )
                  : _buildPlaceholderImage(context),
            ),
          ),

          // Project content
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Project title
                  Text(
                    project.name,
                    style: GoogleFonts.poppins(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).textTheme.titleLarge?.color,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 8),

                  // Project description
                  // Expanded(
                  //   child: Text(
                  //     project.description,
                  //     style: GoogleFonts.poppins(
                  //       fontSize: 14,
                  //       height: 1.5,
                  //       color: Theme.of(
                  //         context,
                  //       ).textTheme.bodyMedium?.color?.withOpacity(0.8),
                  //     ),
                  //   ),
                  // ),

                  // const SizedBox(height: 16),

                  // Technologies
                  if (project.technologies.isNotEmpty)
                    Wrap(
                      spacing: 6,
                      runSpacing: 6,
                      children: project.technologies.take(4).map((tech) {
                        return Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: Theme.of(
                              context,
                            ).primaryColor.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            tech,
                            style: GoogleFonts.poppins(
                              fontSize: 10,
                              fontWeight: FontWeight.w500,
                              color: Theme.of(context).primaryColor,
                            ),
                          ),
                        );
                      }).toList(),
                    ),

                  const SizedBox(height: 16),

                  // Action buttons
                  Row(
                    children: [
                      if (project.githubUrl?.isNotEmpty == true)
                        Expanded(
                          child: _buildActionButton(
                            context,
                            'Code',
                            FontAwesomeIcons.github,
                            () => _launchUrl(project.githubUrl!),
                            isOutlined: true,
                          ),
                        ),
                      if (project.githubUrl?.isNotEmpty == true &&
                          project.liveUrl?.isNotEmpty == true)
                        const SizedBox(width: 12),
                      if (project.liveUrl?.isNotEmpty == true)
                        Expanded(
                          child: _buildActionButton(
                            context,
                            'Live',
                            FontAwesomeIcons.externalLinkAlt,
                            () => _launchUrl(project.liveUrl!),
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPlaceholderImage(BuildContext context) {
    return Container(
      color: Theme.of(context).primaryColor.withOpacity(0.1),
      child: Center(
        child: Icon(
          FontAwesomeIcons.image,
          size: 48,
          color: Theme.of(context).primaryColor.withOpacity(0.5),
        ),
      ),
    );
  }

  Widget _buildActionButton(
    BuildContext context,
    String label,
    IconData icon,
    VoidCallback onPressed, {
    bool isOutlined = false,
  }) {
    return SizedBox(
      height: 36,
      child: ElevatedButton.icon(
        onPressed: onPressed,
        icon: Icon(
          icon,
          size: 14,
          color: isOutlined ? Theme.of(context).primaryColor : Colors.white,
        ),
        label: Text(
          label,
          style: GoogleFonts.poppins(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: isOutlined ? Theme.of(context).primaryColor : Colors.white,
          ),
        ),
        style: ElevatedButton.styleFrom(
          backgroundColor: isOutlined
              ? Colors.transparent
              : Theme.of(context).primaryColor,
          foregroundColor: isOutlined
              ? Theme.of(context).primaryColor
              : Colors.white,
          side: isOutlined
              ? BorderSide(color: Theme.of(context).primaryColor)
              : null,
          elevation: isOutlined ? 0 : 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
      ),
    );
  }

  Future<void> _launchUrl(String url) async {
    final Uri uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(
        uri,
        mode: LaunchMode.platformDefault,
        webViewConfiguration: const WebViewConfiguration(
          enableJavaScript: true,
          enableDomStorage: true,
        ),
      );
    } else {
      // Fallback: try to launch with different mode
      try {
        await launchUrl(uri, mode: LaunchMode.inAppWebView);
      } catch (e) {
        // If all else fails, show error or copy to clipboard
        debugPrint('Could not launch $url: $e');
      }
    }
  }
}
