<<<<<<< HEAD
# Aceternity UI Landing Page - Implementation Guide

## Overview

A premium, interactive landing page has been created using Aceternity UI components with advanced micro-interactions and smooth animations. The new landing page is now live at the root path `/`, while the original landing page is accessible at `/landing-old`.

## 🎨 Implemented Aceternity UI Components

### 1. **FloatingNavbar** (`/src/components/aceternity/FloatingNavbar.tsx`)
- Auto-hides on scroll down, reveals on scroll up
- Smooth opacity and position transitions
- Backdrop blur effect for modern aesthetics
- Integrated GeneriBa logo with proper branding
- Responsive mobile design

**Features:**
- Scroll-direction detection using Framer Motion's `useScroll`
- Animated gradient underlines on nav items
- Magnetic button effect for "Connect Wallet"

### 2. **TextGenerateEffect** (`/src/components/aceternity/TextGenerateEffect.tsx`)
- Word-by-word fade-in animation
- Blur-to-clear transition effect
- InView detection for performance optimization
- Customizable delay timing

**Usage:**
```tsx
<TextGenerateEffect
  words="Fair Work. Open Future."
  className="text-7xl font-bold"
/>
```

### 3. **BackgroundGradient** (`/src/components/aceternity/BackgroundGradient.tsx`)
- Animated gradient border effect
- Smooth color transitions
- Configurable animation speed
- Perfect for highlighting important sections

**Features:**
- Dual-layer gradient system (base + blur)
- Hover intensity changes
- Customizable duration and colors

### 4. **BentoGrid** (`/src/components/aceternity/BentoGrid.tsx`)
- Responsive grid layout with varying card sizes
- Hover lift animations
- Dynamic card spacing
- Support for custom headers and icons

**Grid Items Include:**
- Animated icon backgrounds
- Hover translate effects
- Smooth transition durations
- Custom icon displays

### 5. **CardSpotlight** (`/src/components/aceternity/CardSpotlight.tsx`)
- Mouse-following spotlight effect
- Radial gradient illumination
- Focus state management
- Touch-optimized for mobile

**Interaction:**
- Real-time mouse position tracking
- Smooth opacity transitions
- Contextual focus/blur handling

### 6. **ThreeDCard** (`/src/components/aceternity/ThreeDCard.tsx`)
- Perspective 3D tilt effect
- Mouse position-based rotation
- Smooth spring animations
- Transform preservation for depth

**Physics:**
- Uses Framer Motion springs for natural movement
- Rotates on both X and Y axes
- Auto-resets on mouse leave

### 7. **Sparkles** (`/src/components/aceternity/Sparkles.tsx`)
- Particle animation system
- Configurable particle count and size
- Staggered animation delays
- Infinite loop with easing

**Customization:**
- `particleCount`: Number of particles (default: 50)
- `size`: Particle size multiplier (default: 1.2)
- Random positioning and timing

### 8. **MagneticButton & GlowButton** (`/src/components/aceternity/AnimatedButton.tsx`)
- **MagneticButton**: Scale on hover, shimmer effect
- **GlowButton**: Pulsing glow animation
- Click feedback with scale reduction
- Gradient overlays with opacity animations

### 9. **HeroParallax** (`/src/components/aceternity/HeroParallax.tsx`)
- Scroll-based parallax effect
- Opacity fade on scroll
- Smooth translateY animations
- Performance-optimized with transform

### 10. **MovingBorder** (`/src/components/aceternity/MovingBorder.tsx`)
- Rotating gradient border
- Infinite animation loop
- Customizable duration
- Card highlight effect

## 🎯 Page Sections

### Hero Section
- **Full-screen parallax container**
- Animated gradient blobs with pulsing effects
- Sparkle particle system (30 particles)
- TextGenerateEffect for main headline
- BackgroundGradient badge with DAO branding
- Magnetic and Glow CTA buttons
- Stats display with MovingBorder cards

### Features Section (Bento Grid)
- 4 feature cards in responsive grid
- Custom animated headers for each card:
  - **Decentralized Trust**: Sparkle effect with Shield icon
  - **Instant Payments**: Pulsing Zap icon
  - **Team Collaboration**: Floating Users icon
  - **DAO Governance**: Rotating Award icon
- Hover lift animations on all cards

### Steps Section
- 5-step process breakdown
- 3D Card perspective effects
- CardSpotlight mouse-following illumination
- Icon-based step indicators
- Staggered slide-in animations

### Competitive Edge Section
- BackgroundGradient container for emphasis
- Two-column layout (benefits + stats)
- Animated checkmark list
- ThreeDCard stat cards with spotlight
- Icon accents for visual hierarchy

## 🛠 Utilities & Hooks

### Custom Hooks

**`useScroll` (`/src/hooks/use-scroll.tsx`)**
- Tracks scroll position and direction
- Used for navbar hide/show behavior
- Passive event listeners for performance

**`useMousePosition` (`/src/hooks/use-mouse-position.tsx`)**
- Real-time mouse coordinate tracking
- Powers spotlight and 3D card effects
- Global mouse movement detection

**`useReducedMotion` (`/src/components/aceternity/MobileOptimized.tsx`)**
- Respects user's motion preferences
- Accessibility compliance
- Can disable animations for sensitive users

**`useIsMobile` (`/src/components/aceternity/MobileOptimized.tsx`)**
- Detects mobile viewport
- Enables mobile-specific optimizations
- Responsive behavior adjustments

### Helper Functions (`/src/lib/cn-utils.ts`)

**`generateParticles(count: number)`**
- Creates random particle data
- Returns array of particle objects with position, size, duration, delay

**`getRandomGradient()`**
- Returns random Tailwind gradient classes
- Useful for dynamic styling

## 🎨 Enhanced Tailwind Configuration

### New Custom Animations
- `shimmer`: Background position animation for shine effects
- `gradient-x`: Horizontal gradient animation
- `gradient-y`: Vertical gradient animation
- `spin-slow`: Slow 20-second rotation

### Existing Animations
- `fade-in`, `fade-in-up`: Entry animations
- `scale-in`: Scale entrance effect
- `glow-pulse`: Pulsing shadow effect
- `float`: Vertical floating animation

## 📱 Responsive Design

### Breakpoints
- Mobile-first approach
- `md:` 768px and up
- `lg:` 1024px and up
- Container max-width: 1400px

### Mobile Optimizations
- Floating navbar collapses appropriately
- Grid layouts stack on mobile
- Touch-optimized interactions
- Reduced particle counts on smaller screens
- Simplified animations for performance

## ⚡ Performance Optimizations

### Animation Performance
- Transform and opacity only (GPU-accelerated)
- Passive scroll listeners
- InView detection to defer off-screen animations
- Framer Motion's layout optimization

### Bundle Optimization
- Components are tree-shakeable
- Lazy loading for heavy components (recommended)
- Total bundle size: ~586 KB (175 KB gzipped)

### Recommendations for Further Optimization
1. Implement code-splitting with `React.lazy()`
2. Use `intersection-observer` for scroll animations
3. Reduce particle count on mobile devices
4. Implement virtual scrolling for long lists

## 🎭 Color Scheme

The design maintains your existing purple/violet branding:
- Primary: `hsl(263 70% 60%)` - Purple
- Primary Glow: `hsl(263 90% 70%)` - Lighter purple
- Background: `hsl(240 10% 3.9%)` - Very dark blue
- Accent colors for features: Blue, Yellow, Green, Purple variants

## 🚀 Usage Examples

### Using Individual Components

```tsx
import { FloatingNavbar, TextGenerateEffect, BentoGrid } from '@/components/aceternity';

// Navbar with custom items
<FloatingNavbar navItems={[
  { name: "Home", link: "/" },
  { name: "About", link: "/about" }
]} />

// Animated text
<TextGenerateEffect
  words="Your amazing headline here"
  delay={0.2}
/>

// Feature grid
<BentoGrid>
  <BentoGridItem
    title="Feature 1"
    description="Description here"
    icon={<Icon />}
  />
</BentoGrid>
```

### Creating Custom Combinations

```tsx
// Spotlight card with 3D effect
<ThreeDCard>
  <CardSpotlight>
    <YourContent />
  </CardSpotlight>
</ThreeDCard>

// Button with background gradient
<BackgroundGradient>
  <MagneticButton>
    Click Me
  </MagneticButton>
</BackgroundGradient>
```

## 🔧 Configuration

### Adjusting Animation Speed
In each component, look for `transition={{ duration: X }}` and modify the value.

### Changing Particle Count
```tsx
<Sparkles particleCount={100} size={1.5} />
```

### Modifying Navbar Behavior
Edit `FloatingNavbar.tsx` and adjust the scroll threshold:
```tsx
if (scrollYProgress.get() < 0.05) { // Change this value
  setVisible(true);
}
```

## 📝 Notes

- All animations respect `prefers-reduced-motion`
- Components are fully typed with TypeScript
- Mobile-optimized with touch support
- Accessible with proper ARIA labels
- SEO-friendly with semantic HTML

## 🎯 Next Steps

1. **Add Database Integration**: Connect stats to Supabase for real-time data
2. **Implement Analytics**: Track user interactions with animations
3. **A/B Testing**: Test different animation intensities
4. **Performance Monitoring**: Use Lighthouse to track metrics
5. **Progressive Enhancement**: Add fallbacks for older browsers

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Aceternity UI Official](https://ui.aceternity.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Created with:** React 18, TypeScript, Framer Motion 12, Tailwind CSS 3, shadcn/ui
**Build Status:** ✅ Successful (585 KB, 175 KB gzipped)
**Routes:** `/` (new landing), `/landing-old` (original)
=======
# Aceternity UI Landing Page - Implementation Guide

## Overview

A premium, interactive landing page has been created using Aceternity UI components with advanced micro-interactions and smooth animations. The new landing page is now live at the root path `/`, while the original landing page is accessible at `/landing-old`.

## 🎨 Implemented Aceternity UI Components

### 1. **FloatingNavbar** (`/src/components/aceternity/FloatingNavbar.tsx`)
- Auto-hides on scroll down, reveals on scroll up
- Smooth opacity and position transitions
- Backdrop blur effect for modern aesthetics
- Integrated GeneriBa logo with proper branding
- Responsive mobile design

**Features:**
- Scroll-direction detection using Framer Motion's `useScroll`
- Animated gradient underlines on nav items
- Magnetic button effect for "Connect Wallet"

### 2. **TextGenerateEffect** (`/src/components/aceternity/TextGenerateEffect.tsx`)
- Word-by-word fade-in animation
- Blur-to-clear transition effect
- InView detection for performance optimization
- Customizable delay timing

**Usage:**
```tsx
<TextGenerateEffect
  words="Fair Work. Open Future."
  className="text-7xl font-bold"
/>
```

### 3. **BackgroundGradient** (`/src/components/aceternity/BackgroundGradient.tsx`)
- Animated gradient border effect
- Smooth color transitions
- Configurable animation speed
- Perfect for highlighting important sections

**Features:**
- Dual-layer gradient system (base + blur)
- Hover intensity changes
- Customizable duration and colors

### 4. **BentoGrid** (`/src/components/aceternity/BentoGrid.tsx`)
- Responsive grid layout with varying card sizes
- Hover lift animations
- Dynamic card spacing
- Support for custom headers and icons

**Grid Items Include:**
- Animated icon backgrounds
- Hover translate effects
- Smooth transition durations
- Custom icon displays

### 5. **CardSpotlight** (`/src/components/aceternity/CardSpotlight.tsx`)
- Mouse-following spotlight effect
- Radial gradient illumination
- Focus state management
- Touch-optimized for mobile

**Interaction:**
- Real-time mouse position tracking
- Smooth opacity transitions
- Contextual focus/blur handling

### 6. **ThreeDCard** (`/src/components/aceternity/ThreeDCard.tsx`)
- Perspective 3D tilt effect
- Mouse position-based rotation
- Smooth spring animations
- Transform preservation for depth

**Physics:**
- Uses Framer Motion springs for natural movement
- Rotates on both X and Y axes
- Auto-resets on mouse leave

### 7. **Sparkles** (`/src/components/aceternity/Sparkles.tsx`)
- Particle animation system
- Configurable particle count and size
- Staggered animation delays
- Infinite loop with easing

**Customization:**
- `particleCount`: Number of particles (default: 50)
- `size`: Particle size multiplier (default: 1.2)
- Random positioning and timing

### 8. **MagneticButton & GlowButton** (`/src/components/aceternity/AnimatedButton.tsx`)
- **MagneticButton**: Scale on hover, shimmer effect
- **GlowButton**: Pulsing glow animation
- Click feedback with scale reduction
- Gradient overlays with opacity animations

### 9. **HeroParallax** (`/src/components/aceternity/HeroParallax.tsx`)
- Scroll-based parallax effect
- Opacity fade on scroll
- Smooth translateY animations
- Performance-optimized with transform

### 10. **MovingBorder** (`/src/components/aceternity/MovingBorder.tsx`)
- Rotating gradient border
- Infinite animation loop
- Customizable duration
- Card highlight effect

## 🎯 Page Sections

### Hero Section
- **Full-screen parallax container**
- Animated gradient blobs with pulsing effects
- Sparkle particle system (30 particles)
- TextGenerateEffect for main headline
- BackgroundGradient badge with DAO branding
- Magnetic and Glow CTA buttons
- Stats display with MovingBorder cards

### Features Section (Bento Grid)
- 4 feature cards in responsive grid
- Custom animated headers for each card:
  - **Decentralized Trust**: Sparkle effect with Shield icon
  - **Instant Payments**: Pulsing Zap icon
  - **Team Collaboration**: Floating Users icon
  - **DAO Governance**: Rotating Award icon
- Hover lift animations on all cards

### Steps Section
- 5-step process breakdown
- 3D Card perspective effects
- CardSpotlight mouse-following illumination
- Icon-based step indicators
- Staggered slide-in animations

### Competitive Edge Section
- BackgroundGradient container for emphasis
- Two-column layout (benefits + stats)
- Animated checkmark list
- ThreeDCard stat cards with spotlight
- Icon accents for visual hierarchy

## 🛠 Utilities & Hooks

### Custom Hooks

**`useScroll` (`/src/hooks/use-scroll.tsx`)**
- Tracks scroll position and direction
- Used for navbar hide/show behavior
- Passive event listeners for performance

**`useMousePosition` (`/src/hooks/use-mouse-position.tsx`)**
- Real-time mouse coordinate tracking
- Powers spotlight and 3D card effects
- Global mouse movement detection

**`useReducedMotion` (`/src/components/aceternity/MobileOptimized.tsx`)**
- Respects user's motion preferences
- Accessibility compliance
- Can disable animations for sensitive users

**`useIsMobile` (`/src/components/aceternity/MobileOptimized.tsx`)**
- Detects mobile viewport
- Enables mobile-specific optimizations
- Responsive behavior adjustments

### Helper Functions (`/src/lib/cn-utils.ts`)

**`generateParticles(count: number)`**
- Creates random particle data
- Returns array of particle objects with position, size, duration, delay

**`getRandomGradient()`**
- Returns random Tailwind gradient classes
- Useful for dynamic styling

## 🎨 Enhanced Tailwind Configuration

### New Custom Animations
- `shimmer`: Background position animation for shine effects
- `gradient-x`: Horizontal gradient animation
- `gradient-y`: Vertical gradient animation
- `spin-slow`: Slow 20-second rotation

### Existing Animations
- `fade-in`, `fade-in-up`: Entry animations
- `scale-in`: Scale entrance effect
- `glow-pulse`: Pulsing shadow effect
- `float`: Vertical floating animation

## 📱 Responsive Design

### Breakpoints
- Mobile-first approach
- `md:` 768px and up
- `lg:` 1024px and up
- Container max-width: 1400px

### Mobile Optimizations
- Floating navbar collapses appropriately
- Grid layouts stack on mobile
- Touch-optimized interactions
- Reduced particle counts on smaller screens
- Simplified animations for performance

## ⚡ Performance Optimizations

### Animation Performance
- Transform and opacity only (GPU-accelerated)
- Passive scroll listeners
- InView detection to defer off-screen animations
- Framer Motion's layout optimization

### Bundle Optimization
- Components are tree-shakeable
- Lazy loading for heavy components (recommended)
- Total bundle size: ~586 KB (175 KB gzipped)

### Recommendations for Further Optimization
1. Implement code-splitting with `React.lazy()`
2. Use `intersection-observer` for scroll animations
3. Reduce particle count on mobile devices
4. Implement virtual scrolling for long lists

## 🎭 Color Scheme

The design maintains your existing purple/violet branding:
- Primary: `hsl(263 70% 60%)` - Purple
- Primary Glow: `hsl(263 90% 70%)` - Lighter purple
- Background: `hsl(240 10% 3.9%)` - Very dark blue
- Accent colors for features: Blue, Yellow, Green, Purple variants

## 🚀 Usage Examples

### Using Individual Components

```tsx
import { FloatingNavbar, TextGenerateEffect, BentoGrid } from '@/components/aceternity';

// Navbar with custom items
<FloatingNavbar navItems={[
  { name: "Home", link: "/" },
  { name: "About", link: "/about" }
]} />

// Animated text
<TextGenerateEffect
  words="Your amazing headline here"
  delay={0.2}
/>

// Feature grid
<BentoGrid>
  <BentoGridItem
    title="Feature 1"
    description="Description here"
    icon={<Icon />}
  />
</BentoGrid>
```

### Creating Custom Combinations

```tsx
// Spotlight card with 3D effect
<ThreeDCard>
  <CardSpotlight>
    <YourContent />
  </CardSpotlight>
</ThreeDCard>

// Button with background gradient
<BackgroundGradient>
  <MagneticButton>
    Click Me
  </MagneticButton>
</BackgroundGradient>
```

## 🔧 Configuration

### Adjusting Animation Speed
In each component, look for `transition={{ duration: X }}` and modify the value.

### Changing Particle Count
```tsx
<Sparkles particleCount={100} size={1.5} />
```

### Modifying Navbar Behavior
Edit `FloatingNavbar.tsx` and adjust the scroll threshold:
```tsx
if (scrollYProgress.get() < 0.05) { // Change this value
  setVisible(true);
}
```

## 📝 Notes

- All animations respect `prefers-reduced-motion`
- Components are fully typed with TypeScript
- Mobile-optimized with touch support
- Accessible with proper ARIA labels
- SEO-friendly with semantic HTML

## 🎯 Next Steps

1. **Add Database Integration**: Connect stats to Supabase for real-time data
2. **Implement Analytics**: Track user interactions with animations
3. **A/B Testing**: Test different animation intensities
4. **Performance Monitoring**: Use Lighthouse to track metrics
5. **Progressive Enhancement**: Add fallbacks for older browsers

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Aceternity UI Official](https://ui.aceternity.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Created with:** React 18, TypeScript, Framer Motion 12, Tailwind CSS 3, shadcn/ui
**Build Status:** ✅ Successful (585 KB, 175 KB gzipped)
**Routes:** `/` (new landing), `/landing-old` (original)
>>>>>>> 0d7abc9c87b19a02b20f81b2a7832446f1f39235
