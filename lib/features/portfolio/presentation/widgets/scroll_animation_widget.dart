import 'package:flutter/material.dart';
import 'package:visibility_detector/visibility_detector.dart';

class ScrollAnimationWidget extends StatefulWidget {
  final Widget child;
  final Duration duration;
  final Curve curve;
  final double slideOffset;
  final String uniqueKey;
  final Duration delay;

  const ScrollAnimationWidget({
    super.key,
    required this.child,
    required this.uniqueKey,
    this.duration = const Duration(milliseconds: 800),
    this.curve = Curves.easeOutCubic,
    this.slideOffset = 50.0,
    this.delay = Duration.zero,
  });

  @override
  State<ScrollAnimationWidget> createState() => _ScrollAnimationWidgetState();
}

class _ScrollAnimationWidgetState extends State<ScrollAnimationWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  bool _hasAnimated = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(duration: widget.duration, vsync: this);

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: widget.curve));

    _slideAnimation = Tween<Offset>(
      begin: Offset(0, widget.slideOffset / 100),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: widget.curve));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _startAnimation() async {
    if (!_hasAnimated && mounted) {
      _hasAnimated = true;
      if (widget.delay != Duration.zero) {
        await Future.delayed(widget.delay);
      }
      if (mounted) {
        _controller.forward();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return VisibilityDetector(
      key: Key(widget.uniqueKey),
      onVisibilityChanged: (visibilityInfo) {
        if (visibilityInfo.visibleFraction > 0.3) {
          _startAnimation();
        }
      },
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return FadeTransition(
            opacity: _fadeAnimation,
            child: SlideTransition(
              position: _slideAnimation,
              child: widget.child,
            ),
          );
        },
      ),
    );
  }
}

// Staggered animation widget for multiple children
class StaggeredScrollAnimation extends StatelessWidget {
  final List<Widget> children;
  final Duration staggerDelay;
  final Duration animationDuration;
  final String baseKey;
  final Axis direction;

  const StaggeredScrollAnimation({
    super.key,
    required this.children,
    required this.baseKey,
    this.staggerDelay = const Duration(milliseconds: 200),
    this.animationDuration = const Duration(milliseconds: 800),
    this.direction = Axis.vertical,
  });

  @override
  Widget build(BuildContext context) {
    return direction == Axis.vertical
        ? Column(children: _buildStaggeredChildren())
        : Row(children: _buildStaggeredChildren());
  }

  List<Widget> _buildStaggeredChildren() {
    return children.asMap().entries.map((entry) {
      int index = entry.key;
      Widget child = entry.value;

      return ScrollAnimationWidget(
        uniqueKey: '${baseKey}_$index',
        delay: Duration(milliseconds: staggerDelay.inMilliseconds * index),
        duration: animationDuration,
        child: child,
      );
    }).toList();
  }
}
