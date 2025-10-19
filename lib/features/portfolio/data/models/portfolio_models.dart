import '../../domain/entities/portfolio_section.dart';

class PersonalInfoModel extends PersonalInfo {
  const PersonalInfoModel({
    required super.name,
    required super.title,
    required super.description,
    required super.email,
    required super.phone,
    required super.location,
    required super.profileImageUrl,
    required super.socialLinks,
  });

  factory PersonalInfoModel.fromJson(Map<String, dynamic> json) {
    return PersonalInfoModel(
      name: json['name'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      email: json['email'] ?? '',
      phone: json['phone'] ?? '',
      location: json['location'] ?? '',
      profileImageUrl: json['profileImageUrl'] ?? '',
      socialLinks: Map<String, String>.from(json['socialLinks'] ?? {}),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'title': title,
      'description': description,
      'email': email,
      'phone': phone,
      'location': location,
      'profileImageUrl': profileImageUrl,
      'socialLinks': socialLinks,
    };
  }
}

class SocialLinkModel extends SocialLink {
  const SocialLinkModel({
    required super.platform,
    required super.url,
    required super.iconData,
  });

  factory SocialLinkModel.fromJson(Map<String, dynamic> json) {
    return SocialLinkModel(
      platform: json['platform'] ?? '',
      url: json['url'] ?? '',
      iconData: json['iconData'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {'platform': platform, 'url': url, 'iconData': iconData};
  }
}

class SkillModel extends Skill {
  const SkillModel({
    required super.name,
    required super.category,
    required super.proficiency,
  });

  factory SkillModel.fromJson(Map<String, dynamic> json) {
    return SkillModel(
      name: json['name'] ?? '',
      category: json['category'] ?? '',
      proficiency: json['proficiency'] ?? 1,
    );
  }

  Map<String, dynamic> toJson() {
    return {'name': name, 'category': category, 'proficiency': proficiency};
  }
}

class ExperienceModel extends Experience {
  const ExperienceModel({
    required super.company,
    required super.position,
    required super.duration,
    required super.responsibilities,
    required super.isCurrent,
  });

  factory ExperienceModel.fromJson(Map<String, dynamic> json) {
    return ExperienceModel(
      company: json['company'] ?? '',
      position: json['position'] ?? '',
      duration: json['duration'] ?? '',
      responsibilities: List<String>.from(json['responsibilities'] ?? []),
      isCurrent: json['isCurrent'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'company': company,
      'position': position,
      'duration': duration,
      'responsibilities': responsibilities,
      'isCurrent': isCurrent,
    };
  }
}

class ProjectModel extends Project {
  const ProjectModel({
    required super.name,
    required super.description,
    required super.technologies,
    super.githubUrl,
    super.liveUrl,
    super.imageUrl,
  });

  factory ProjectModel.fromJson(Map<String, dynamic> json) {
    return ProjectModel(
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      technologies: List<String>.from(json['technologies'] ?? []),
      githubUrl: json['githubUrl'],
      liveUrl: json['liveUrl'],
      imageUrl: json['imageUrl'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'description': description,
      'technologies': technologies,
      'githubUrl': githubUrl,
      'liveUrl': liveUrl,
      'imageUrl': imageUrl,
    };
  }
}

class AwardModel extends Award {
  const AwardModel({
    required super.title,
    required super.organization,
    required super.date,
    required super.description,
  });

  factory AwardModel.fromJson(Map<String, dynamic> json) {
    return AwardModel(
      title: json['title'] ?? '',
      organization: json['organization'] ?? '',
      date: json['date'] ?? '',
      description: json['description'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'organization': organization,
      'date': date,
      'description': description,
    };
  }
}
