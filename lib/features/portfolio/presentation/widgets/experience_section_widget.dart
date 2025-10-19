import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

// Entity class for Experience
class Experience {
  final String position;
  final String company;
  final String duration;
  final String website;
  final List<String> responsibilities;

  Experience({
    required this.position,
    required this.company,
    required this.duration,
    required this.website,
    required this.responsibilities,
  });
}

// The main section widget
class ExperienceSectionWidget extends StatelessWidget {
  final List<Experience> experiences;

  const ExperienceSectionWidget({super.key, required this.experiences});

  @override
  Widget build(BuildContext context) {
    final isMobile = ResponsiveBreakpoints.of(context).isMobile;

    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 80,
        vertical: isMobile ? 60 : 80,
      ),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Theme.of(context).primaryColor.withOpacity(0.05),
            Theme.of(context).scaffoldBackgroundColor,
          ],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Section title
          Text(
            'Experience',
            style: GoogleFonts.poppins(
              fontSize: isMobile ? 28 : 36,
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

          // Experience timeline
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1000),
            child: Column(
              children: experiences.asMap().entries.map((entry) {
                int index = entry.key;
                Experience exp = entry.value;
                bool isLast = index == experiences.length - 1;
                bool alignLeft = isMobile ? true : index.isEven;

                return _buildExperienceItem(context, exp, isLast, alignLeft);
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExperienceItem(
    BuildContext context,
    Experience experience,
    bool isLast,
    bool alignLeft,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 32),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (!alignLeft) const Spacer(),

          // Timeline + card
          Expanded(
            flex: 5,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Timeline indicator
                Column(
                  children: [
                    Container(
                      width: 16,
                      height: 16,
                      decoration: BoxDecoration(
                        color: Theme.of(context).primaryColor,
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: Theme.of(context).scaffoldBackgroundColor,
                          width: 3,
                        ),
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

                // Experience card
                Expanded(child: ExperienceCard(experience: experience)),
              ],
            ),
          ),

          if (alignLeft) const Spacer(),
        ],
      ),
    );
  }
}

// Card widget for each experience
class ExperienceCard extends StatelessWidget {
  final Experience experience;

  const ExperienceCard({super.key, required this.experience});

  Future<void> _launchWebsite(String url) async {
    final Uri uri = Uri.parse(url);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      throw "Could not launch $url";
    }
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = ResponsiveBreakpoints.of(context).isMobile;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 500),
      curve: Curves.easeOut,
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Position
          Text(
            experience.position,
            style: GoogleFonts.poppins(
              fontSize: isMobile ? 18 : 20,
              fontWeight: FontWeight.bold,
              color: Theme.of(context).textTheme.titleLarge?.color,
            ),
          ),
          const SizedBox(height: 4),

          // Company with website link
          GestureDetector(
            onTap: () => _launchWebsite(experience.website),
            child: Text(
              experience.company,
              style: GoogleFonts.poppins(
                fontSize: isMobile ? 16 : 18,
                fontWeight: FontWeight.w600,
                color: Theme.of(context).primaryColor,
                decoration: TextDecoration.underline,
              ),
            ),
          ),
          const SizedBox(height: 8),

          // Duration
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
                experience.duration,
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

          // Responsibilities as bullet list
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: experience.responsibilities.map((resp) {
              return Padding(
                padding: const EdgeInsets.only(bottom: 6),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text("• "),
                    Expanded(
                      child: Text(
                        resp,
                        style: GoogleFonts.poppins(
                          fontSize: 14,
                          height: 1.6,
                          color: Theme.of(
                            context,
                          ).textTheme.bodyMedium?.color?.withOpacity(0.8),
                        ),
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}

// Your refined data with minimal responsibilities + emojis
final experiences = [
  Experience(
    position: "Flutter Developer / Mobile App Developer",
    company: "Neurealm (Formerly GS Lab | GAVS)",
    duration: "Aug 2023 – Present",
    website: "https://www.neurealm.com",
    responsibilities: [
      "💳 Delivered UPI AutoPay & payment flows with 100% NPCI compliance.",
      "⚡ Optimized APIs & caching, boosting app performance by 30%.",
      "📡 Integrated BBPS APIs for electricity, water, DTH & telecom bill-pay.",
      "👨‍💻 Mentored juniors on Flutter best practices & clean architecture.",
      "🤝 Collaborated with backend teams for seamless API integration.",
    ],
  ),
  Experience(
    position: "Flutter Developer / Cross-Platform Developer",
    company: "Novac Technology Solutions",
    duration: "Jul 2021 – Jul 2023",
    website: "https://www.novactech.com",
    responsibilities: [
      "🛒 Built an E-commerce automobile app with secure payments & real-time inventory.",
      "📱 Designed responsive cross-platform UI/UX in Flutter (Android & iOS).",
      "🚀 Improved scalability & performance via optimized backend integrations.",
      "🔄 Implemented CI/CD pipelines, reducing release cycles by 20%.",
    ],
  ),
];
