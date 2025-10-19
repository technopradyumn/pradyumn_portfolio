import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:animate_do/animate_do.dart';

class SkillsSectionWidget extends StatelessWidget {
  const SkillsSectionWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = ResponsiveBreakpoints.of(context).isMobile;

    /// Example data with proficiency levels
    final skillsByCategory = {
      "Languages": {"Dart": 0.95, "Kotlin": 0.75, "Swift": 0.65},
      "Frameworks & Platforms": {
        "Flutter": 0.95,
        "Android SDK": 0.8,
        "iOS SDK": 0.7,
      },
      "Cloud & Services": {"Firebase": 0.9, "Google Cloud": 0.7},
      "Architecture & State Management": {
        "BLoC": 0.9,
        "Provider": 0.85,
        "Riverpod": 0.8,
        "MVVM": 0.75,
        "Clean Architecture": 0.8,
      },
      "CI/CD & Deployment": {
        "GitHub Actions": 0.85,
        "Jenkins": 0.7,
        "Play Store": 0.9,
      },
      "Testing": {
        "Unit Test": 0.8,
        "Widget Test": 0.75,
        "Integration Test": 0.7,
      },
    };

    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 80,
        vertical: 80,
      ),
      color: Theme.of(context).scaffoldBackgroundColor,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          /// Section Header
          FadeInDown(
            duration: const Duration(milliseconds: 800),
            child: Column(
              children: [
                Text(
                  "Technical Skills",
                  style: GoogleFonts.poppins(
                    fontSize: isMobile ? 28 : 36,
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).primaryColor,
                  ),
                ),
                const SizedBox(height: 12),
                Container(
                  width: 80,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Theme.of(context).primaryColor,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 50),

          /// Skill Categories
          Wrap(
            spacing: 24,
            runSpacing: 24,
            alignment: WrapAlignment.center,
            children: skillsByCategory.entries.map((entry) {
              return _HoverableSkillCard(title: entry.key, skills: entry.value);
            }).toList(),
          ),
        ],
      ),
    );
  }
}

class _HoverableSkillCard extends StatefulWidget {
  final String title;
  final Map<String, double> skills;

  const _HoverableSkillCard({required this.title, required this.skills});

  @override
  State<_HoverableSkillCard> createState() => _HoverableSkillCardState();
}

class _HoverableSkillCardState extends State<_HoverableSkillCard> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 600),
      child: MouseRegion(
        onEnter: (_) => setState(() => _hovering = true),
        onExit: (_) => setState(() => _hovering = false),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          width: 360,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Theme.of(context).cardColor,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: _hovering
                    ? Theme.of(context).primaryColor.withOpacity(0.3)
                    : Theme.of(context).shadowColor.withOpacity(0.1),
                blurRadius: _hovering ? 20 : 10,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /// Category Title
              Text(
                widget.title,
                style: GoogleFonts.poppins(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).primaryColor,
                ),
              ),
              const SizedBox(height: 20),

              /// Skills List
              Column(
                children: widget.skills.entries.map((e) {
                  return _SkillProgressItem(skill: e.key, level: e.value);
                }).toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SkillProgressItem extends StatefulWidget {
  final String skill;
  final double level;

  const _SkillProgressItem({required this.skill, required this.level});

  @override
  State<_SkillProgressItem> createState() => _SkillProgressItemState();
}

class _SkillProgressItemState extends State<_SkillProgressItem> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovering = true),
      onExit: (_) => setState(() => _hovering = false),
      child: Padding(
        padding: const EdgeInsets.only(bottom: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            /// Skill name + %
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  widget.skill,
                  style: GoogleFonts.poppins(
                    fontSize: 14,
                    fontWeight: _hovering ? FontWeight.w700 : FontWeight.w500,
                    color: _hovering
                        ? Theme.of(context).primaryColor
                        : Theme.of(context).textTheme.titleMedium?.color,
                  ),
                ),
                Text(
                  "${(widget.level * 100).toInt()}%",
                  style: GoogleFonts.poppins(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: Theme.of(context).primaryColor,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),

            /// Animated Progress Bar
            TweenAnimationBuilder<double>(
              duration: const Duration(milliseconds: 800),
              curve: Curves.easeOut,
              tween: Tween(begin: 0, end: widget.level),
              builder: (context, value, _) => Container(
                height: 6,
                decoration: BoxDecoration(
                  color: Theme.of(context).primaryColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(3),
                ),
                child: FractionallySizedBox(
                  alignment: Alignment.centerLeft,
                  widthFactor: value,
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    decoration: BoxDecoration(
                      color: _hovering
                          ? Theme.of(context).primaryColor.withOpacity(0.8)
                          : Theme.of(context).primaryColor,
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
