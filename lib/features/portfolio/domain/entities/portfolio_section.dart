import 'package:equatable/equatable.dart';

class PortfolioSection extends Equatable {
  final String id;
  final String title;
  final String content;
  final bool isVisible;

  const PortfolioSection({
    required this.id,
    required this.title,
    required this.content,
    required this.isVisible,
  });

  @override
  List<Object?> get props => [id, title, content, isVisible];
}

class PersonalInfo extends Equatable {
  final String name;
  final String title;
  final String description;
  final String email;
  final String phone;
  final String location;
  final String profileImageUrl;
  final Map<String, String> socialLinks;

  const PersonalInfo({
    required this.name,
    required this.title,
    required this.description,
    required this.email,
    required this.phone,
    required this.location,
    required this.profileImageUrl,
    required this.socialLinks,
  });

  @override
  List<Object> get props => [
    name,
    title,
    description,
    email,
    phone,
    location,
    profileImageUrl,
    socialLinks,
  ];
}

class SocialLink extends Equatable {
  final String platform;
  final String url;
  final String iconData;

  const SocialLink({
    required this.platform,
    required this.url,
    required this.iconData,
  });

  @override
  List<Object?> get props => [platform, url, iconData];
}

class Skill extends Equatable {
  final String name;
  final String category;
  final int proficiency; // 1-5 scale

  const Skill({
    required this.name,
    required this.category,
    required this.proficiency,
  });

  @override
  List<Object?> get props => [name, category, proficiency];
}

class Experience extends Equatable {
  final String company;
  final String position;
  final String duration;
  final List<String> responsibilities;
  final bool isCurrent;

  const Experience({
    required this.company,
    required this.position,
    required this.duration,
    required this.responsibilities,
    required this.isCurrent,
  });

  @override
  List<Object?> get props => [
    company,
    position,
    duration,
    responsibilities,
    isCurrent,
  ];
}

class Project extends Equatable {
  final String name;
  final String description;
  final List<String> technologies;
  final String? githubUrl;
  final String? liveUrl;
  final String? imageUrl;

  const Project({
    required this.name,
    required this.description,
    required this.technologies,
    this.githubUrl,
    this.liveUrl,
    this.imageUrl,
  });

  @override
  List<Object?> get props => [
    name,
    description,
    technologies,
    githubUrl,
    liveUrl,
    imageUrl,
  ];
}

class Award extends Equatable {
  final String title;
  final String organization;
  final String date;
  final String description;

  const Award({
    required this.title,
    required this.organization,
    required this.date,
    required this.description,
  });

  @override
  List<Object?> get props => [title, organization, date, description];
}
