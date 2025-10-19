import 'package:flutter/material.dart';

class SplashProvider extends ChangeNotifier {
  bool _isLoading = true;
  bool _showMainApp = false;

  bool get isLoading => _isLoading;
  bool get showMainApp => _showMainApp;

  SplashProvider() {
    _initializeSplash();
  }

  void _initializeSplash() async {
    // Simulate loading time for a better user experience
    await Future.delayed(const Duration(milliseconds: 2000));

    _isLoading = false;
    notifyListeners();

    // Small delay before showing main app for smooth transition
    // await Future.delayed(const Duration(milliseconds: 100));

    _showMainApp = true;
    notifyListeners();
  }

  void resetSplash() {
    _isLoading = true;
    _showMainApp = false;
    notifyListeners();
    _initializeSplash();
  }
}
