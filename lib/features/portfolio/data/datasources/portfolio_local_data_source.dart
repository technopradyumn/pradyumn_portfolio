import '../models/portfolio_models.dart';

abstract class PortfolioLocalDataSource {
  Future<PersonalInfoModel> getPersonalInfo();
  Future<List<SkillModel>> getSkills();
  Future<List<ExperienceModel>> getExperience();
  Future<List<ProjectModel>> getProjects();
  Future<List<AwardModel>> getAwards();
}

class PortfolioLocalDataSourceImpl implements PortfolioLocalDataSource {
  @override
  Future<PersonalInfoModel> getPersonalInfo() async {
    await Future.delayed(const Duration(milliseconds: 500));

    return const PersonalInfoModel(
      name: 'Pradyumn',
      title: 'Mobile App Developer',
      description:
      'Passionate Mobile App Developer specializing in Flutter, Dart, Kotlin, and Java with expertise in building production-ready mobile applications. Experienced in state management, RESTful APIs, real-time communication, and clean architecture principles.',
      email: 'technopradyumn@gmail.com',
      phone: '+91 9453283619',
      location: 'Indra Nagar, Orai, dis. Jalaun, UP',
      profileImageUrl:
      'https://drive.google.com/file/d/1k9H2tFuGiPUvAFKQNbfiR0hY97d03D9B/view?usp=drive_link',
      socialLinks: {
        'github': 'https://github.com/technopradyumn',
        'linkedin': 'https://www.linkedin.com/in/technopradyumn/',
      },
    );
  }

  @override
  Future<List<SkillModel>> getSkills() async {
    await Future.delayed(const Duration(milliseconds: 300));

    return const [
      // Languages
      SkillModel(name: 'Dart', category: 'Languages', proficiency: 5),
      SkillModel(name: 'Java', category: 'Languages', proficiency: 5),
      SkillModel(name: 'Kotlin', category: 'Languages', proficiency: 5),

      // Flutter Development
      SkillModel(
        name: 'Flutter SDK',
        category: 'Flutter Development',
        proficiency: 5,
      ),
      SkillModel(
        name: 'Bloc',
        category: 'Flutter Development',
        proficiency: 5,
      ),
      SkillModel(
        name: 'Provider',
        category: 'Flutter Development',
        proficiency: 5,
      ),
      SkillModel(
        name: 'HTTP & RESTful APIs',
        category: 'Flutter Development',
        proficiency: 5,
      ),
      SkillModel(
        name: 'WebSockets (Socket.io)',
        category: 'Flutter Development',
        proficiency: 5,
      ),
      SkillModel(
        name: 'Firebase Cloud Messaging (FCM)',
        category: 'Flutter Development',
        proficiency: 5,
      ),
      SkillModel(
        name: 'GoRouter',
        category: 'Flutter Development',
        proficiency: 5,
      ),
      SkillModel(
        name: 'Flutter DevTools',
        category: 'Flutter Development',
        proficiency: 4,
      ),

      // Frameworks & Tools
      SkillModel(
        name: 'Android SDK',
        category: 'Frameworks & Tools',
        proficiency: 5,
      ),
      SkillModel(
        name: 'Jetpack Compose',
        category: 'Frameworks & Tools',
        proficiency: 5,
      ),
      SkillModel(
        name: 'Dio',
        category: 'Frameworks & Tools',
        proficiency: 5,
      ),
      SkillModel(
        name: 'Retrofit',
        category: 'Frameworks & Tools',
        proficiency: 4,
      ),
      SkillModel(
        name: 'Git',
        category: 'Frameworks & Tools',
        proficiency: 5,
      ),
      SkillModel(
        name: 'GitHub',
        category: 'Frameworks & Tools',
        proficiency: 5,
      ),

      // Databases
      SkillModel(name: 'Firebase', category: 'Databases', proficiency: 5),
      SkillModel(name: 'Supabase', category: 'Databases', proficiency: 5),
      SkillModel(
        name: 'Room Database',
        category: 'Databases',
        proficiency: 5,
      ),

      // Architecture
      SkillModel(name: 'MVVM', category: 'Architecture', proficiency: 5),
      SkillModel(
        name: 'Clean Architecture',
        category: 'Architecture',
        proficiency: 5,
      ),
      SkillModel(name: 'OOP', category: 'Architecture', proficiency: 5),

      // Additional Skills
      SkillModel(
        name: 'Payment Gateway Integration',
        category: 'Additional Skills',
        proficiency: 5,
      ),
      SkillModel(
        name: 'Google Maps API',
        category: 'Additional Skills',
        proficiency: 5,
      ),
      SkillModel(
        name: 'Real-time Data Synchronization',
        category: 'Additional Skills',
        proficiency: 5,
      ),
      SkillModel(
        name: 'Performance Optimization',
        category: 'Additional Skills',
        proficiency: 5,
      ),
      SkillModel(
        name: 'UI/UX Design',
        category: 'Additional Skills',
        proficiency: 5,
      ),
    ];
  }

  @override
  Future<List<ExperienceModel>> getExperience() async {
    await Future.delayed(const Duration(milliseconds: 400));

    return const [
      ExperienceModel(
        company: 'AiToXr',
        position: 'Mobile App Developer',
        duration: 'Sep 2025 - Present',
        responsibilities: [
          'Developed the Turflo app with Flutter, integrating real-time chat using Socket.io',
          'Implemented push notifications via Firebase Cloud Messaging',
          'Integrated Cashfree Payment Gateway for in-app payments',
          'Built responsive UI with reusable custom widgets and clean code practices',
        ],
        isCurrent: true,
      ),
      ExperienceModel(
        company: 'AiToXr',
        position: 'Mobile App Developer Intern',
        duration: 'Feb 2025 - Aug 2025',
        responsibilities: [
          'Developed a Flutter application for sports venue booking (Turflo), focusing on responsive UI with reusable custom widgets and clean code practices',
          'Engineered efficient API integration using Dio for HTTP requests (GET, POST) to Supabase, ensuring real-time data synchronization and reliable state management with Bloc',
          'Implemented GoRouter for streamlined navigation, significantly improving the user flow and performance',
          'Utilized Flutter DevTools for performance profiling and memory optimization, resulting in a smoother user experience',
          'Collaborated with backend teams to integrate and consume RESTful APIs, enhancing data flow and application functionality',
        ],
        isCurrent: false,
      ),
    ];
  }

  @override
  Future<List<ProjectModel>> getProjects() async {
    await Future.delayed(const Duration(milliseconds: 350));

    return const [
      ProjectModel(
        name: 'Turflo',
        description:
        'A sports venue booking application with real-time availability checks and sport-specific filters. '
            'Features real-time chat using Socket.io, push notifications via FCM, and Cashfree payment integration. '
            'Built with Flutter, Dio, Supabase, and Bloc for state management. '
            'Ensured consistent data synchronization to reduce booking errors and prevent double bookings.',
        technologies: [
          'Flutter',
          'Dart',
          'Socket.io',
          'Firebase Cloud Messaging',
          'Supabase',
          'Dio',
          'Bloc',
          'GoRouter',
          'Cashfree Payment Gateway'
        ],
        githubUrl: 'https://github.com/technopradyumn',
        liveUrl: 'https://play.google.com/store/apps/details?id=com.turflo.consumer_app.turflo_consumer_app&pcampaignid=web_share',
        imageUrl: 'https://play-lh.googleusercontent.com/A4rDGmVuQQvfeWJ5wQkt-6CTlbW0CiHuR4Djl9qMNjHQ8KKZDEgHvRUFv_DMIoiSZyVn=w480-h960-rw',
      ),
      ProjectModel(
        name: 'Flying Marioo Game',
        description:
        'A 2D game built using Jetpack Compose with optimized rendering techniques and efficient UI composition. '
            'Features Room Database for reliable score tracking and seamless game progress management. '
            'Enhanced gameplay responsiveness for a smooth and engaging user experience.',
        technologies: [
          'Kotlin',
          'Jetpack Compose',
          'Room Database',
          'Android SDK'
        ],
        githubUrl: 'https://github.com/technopradyumn',
        liveUrl: null,
        imageUrl: 'assets/images/flying_marioo.png',
      ),
      ProjectModel(
        name: 'EV Station Map App',
        description:
        'A real-time EV station locator application using Google Maps API with precise location tracking and validation. '
            'Optimized search functionality for faster and more reliable results, enabling quick access to nearby EV stations. '
            'Enhanced data accuracy through precise location tracking.',
        technologies: ['Java', 'Android SDK', 'Google Maps API'],
        githubUrl: 'https://github.com/technopradyumn',
        liveUrl: null,
        imageUrl: 'assets/images/ev_station_map.png',
      ),
    ];
  }

  @override
  Future<List<AwardModel>> getAwards() async {
    await Future.delayed(const Duration(milliseconds: 200));

    return const [
      AwardModel(
        title: 'Top 10% Ranking on TestDome',
        organization: 'TestDome',
        date: '2024',
        description:
        'Achieved Top 10% Ranking on TestDome\'s Android skills assessment. Successfully resolved complex Android challenges, showcasing strong analytical abilities. Mastered two new advanced Android topics, expanding technical expertise.',
      ),
      AwardModel(
        title: 'D4 Hackathon Challenge 2024',
        organization: 'D4 Community',
        date: '2024',
        description:
        'Participated in InnoSprint: HACK-N-WIN: D4 Hackathon Challenge 2024, demonstrating problem-solving skills and innovative thinking in mobile app development.',
      ),
      AwardModel(
        title: 'D4 Hackathon Challenge 2023',
        organization: 'D4 Community',
        date: '2023',
        description:
        'Participated in D4 Hackathon Challenge 2023, collaborating with teams to build innovative solutions and enhance technical skills.',
      ),
      AwardModel(
        title: 'Certificate of Training in Android Development',
        organization: 'Internshala',
        date: '2024',
        description:
        'Completed an 8-week online training in Android App Development from Internshala. Learned essential skills to build user interfaces, manage data with Room database, and develop production-ready Android applications.',
      ),
      AwardModel(
        title: 'Real Android App Dev in 15 Hours | KotlinDevX',
        organization: 'Udemy',
        date: '2024',
        description:
        'Gained expertise in Android app development with Kotlin through comprehensive course covering modern Android development practices and best practices.',
      ),
    ];
  }
}
