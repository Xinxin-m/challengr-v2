# Figma Export Instructions - Challenge Card + Interaction Flow

## File Structure Requirements

### 1. Figma File Organization
Create a new Figma file named: `ChallengeCard_InteractionFlow_v1.fig`

**Required Page Structure:**
```
📄 Cover
📄 0-Foundations
📄 1-Components  
📄 2-Patterns
📄 3-Layouts
📄 4-Prototypes
📄 5-Exports
📄 6-Docs
```

### 2. Page Content Specifications

#### 📄 Cover Page
- Project title: "Challenge Card + Interaction Flow"
- Version: v1.0
- Last updated date
- Contributors list
- Brief description of the component system

#### 📄 0-Foundations
**Color Styles** (Must be created as Figma Styles):
- `color/brand/primary` → #00d4ff
- `color/brand/secondary` → #ffd700  
- `color/brand/accent` → #8b5cf6
- `color/rarity/legendary` → #f59e0b
- `color/surface/primary` → #0a0e17
- `color/text/primary` → #ffffff
- `color/text/secondary` → #a0aec0

**Text Styles** (Must be created as Figma Styles):
- `text/heading/xl` → Inter, 32px, 700 weight
- `text/heading/lg` → Inter, 24px, 600 weight
- `text/body/lg` → Inter, 18px, 500 weight
- `text/body/md` → Inter, 16px, 400 weight
- `text/caption/sm` → Inter, 14px, 400 weight

**Effect Styles** (Must be created as Figma Styles):
- `effect/shadow/lg` → 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- `effect/glow/primary` → 0 0 20px rgba(0, 212, 255, 0.5)
- `effect/glow/legendary` → 0 0 40px rgba(255, 215, 0, 0.8)

**Grid Styles:**
- 8px baseline grid
- 12-column layout grid (desktop)
- 4-column layout grid (mobile)

#### 📄 1-Components
**Component Hierarchy** (All must use Auto Layout):

```
🧩 ChallengeCard [Component Set]
├── 📦 Size Variants
│   ├── compact (320×240px)
│   ├── default (384×320px) 
│   ├── hero (512×400px)
│   └── featured (100%×480px)
├── 🎯 Difficulty Variants
│   ├── beginner (#10b981)
│   ├── intermediate (#3b82f6)
│   ├── advanced (#8b5cf6)
│   ├── expert (#f59e0b)
│   └── legendary (#ffd700)
├── 🎮 Type Variants
│   ├── solo
│   ├── multiplayer
│   ├── tournament
│   └── raid
└── 🎭 State Variants
    ├── default
    ├── hover
    ├── pressed
    └── disabled

🧩 DifficultyBadge [Component Set]
├── 📏 Size: sm, md, lg
├── 🎯 Difficulty: beginner → legendary
└── 🎭 State: default, hover, focus

🧩 ParticipantStats [Component Set]
├── 📐 Layout: horizontal, vertical
├── 📏 Size: sm, md, lg  
└── 📊 Progress: shown, hidden

🧩 ChallengeActions [Component Set]
├── 📐 Layout: row, column
├── 🔢 Button Count: 1, 2, 3, 4
├── 💰 Can Afford: true, false
└── 📏 Size: sm, md, lg

🧩 RewardDisplay [Component Set]
├── 🏆 Type: xp, coins, tokens, equipment
├── 📏 Size: sm, md, lg
└── ✨ Emphasis: subtle, prominent, featured
```

**Auto Layout Requirements:**
- Every component must use Auto Layout
- No absolute positioning allowed
- Proper constraints for responsive behavior
- Gap spacing using 8px increments

**Icon Components** (24×24px, SVG vectors only):
- `icon/play-24`
- `icon/users-24` 
- `icon/clock-24`
- `icon/coins-24`
- `icon/trophy-24`
- `icon/star-24`
- `icon/bookmark-24`
- `icon/share-24`

#### 📄 2-Patterns
**Composite Patterns:**
- Challenge Card Grid Layout
- Challenge Detail Modal
- Action Button Groups
- Reward Breakdown Layout

#### 📄 3-Layouts
**Responsive Layouts:**
- Desktop: 1440px container
- Tablet: 768px container  
- Mobile: 375px container

**Constraints Configuration:**
- Desktop: Fixed width components
- Tablet: Adaptive width with margins
- Mobile: Full-width with padding

#### 📄 4-Prototypes
**Required Interactions:**
- Card hover state (300ms ease-out)
- Card press state (150ms ease-in)
- Button interactions
- Modal open/close
- Loading states

**Smart Animate Transitions:**
- Size variant transitions
- State changes
- Modal appearances

#### 📄 5-Exports
**Export Settings:**
- PNG @1x, @2x for visual samples
- SVG for all icons
- JSON for design tokens (using Figma Tokens plugin)

#### 📄 6-Docs
**Documentation Frames:**
- Component usage guidelines
- Variant selection rules
- Props mapping table
- Accessibility requirements
- Animation specifications

## Required Figma Plugins

Install these plugins before starting:
1. **Figma Tokens** - For token export
2. **Design Lint** - For validation
3. **LottieFiles** - For animation export
4. **Themer** - For theme management
5. **Content Reel** - For realistic content
6. **Auto Layout** - For layout assistance

## Export Process

### Step 1: Design Token Export
1. Install Figma Tokens plugin
2. Configure token mapping to match `figma-tokens.json`
3. Export tokens in Style Dictionary format
4. Validate JSON structure

### Step 2: Component Export  
1. Select all components in 1-Components page
2. Export as PNG @1x and @2x
3. Export icons as SVG
4. Generate component manifest

### Step 3: Prototype Export
1. Create prototypes in 4-Prototypes page
2. Export interaction flows as GIF/MP4
3. Create Lottie animations (keep under 200KB)
4. Document animation specifications

### Step 4: Code Generation
1. Use Dev Mode to inspect components
2. Generate CSS/React code snippets
3. Create Storybook stories
4. Validate props mapping

## Quality Checklist

### ✅ Auto Layout Compliance
- [ ] All components use Auto Layout
- [ ] No absolute positioning in components
- [ ] Proper constraints configured
- [ ] Responsive behavior tested

### ✅ Variant Management  
- [ ] Maximum 6 variant axes per component
- [ ] Clear variant naming convention
- [ ] All states represented
- [ ] Logical variant combinations

### ✅ Accessibility
- [ ] Contrast ratio ≥ 4.5:1 for all text
- [ ] Focus states for interactive elements
- [ ] Proper text sizes (≥12px)
- [ ] ARIA-friendly naming

### ✅ Design Tokens
- [ ] All styles use design tokens
- [ ] Token export validates
- [ ] Theme variants included
- [ ] Consistent naming convention

### ✅ Developer Handoff
- [ ] Props clearly documented
- [ ] Storybook stories created
- [ ] Code snippets provided
- [ ] Component manifest complete

## Validation Commands

```bash
# Install dependencies
npm install

# Run Figma validation
node design-system/validateFigma.js

# Generate Storybook
npm run storybook

# Export design tokens
figma-tokens sync

# Run accessibility checks
npm run a11y-test
```

## File Naming Conventions

**Components:**
- `ChallengeCard/Default`
- `ChallengeCard/Compact`
- `DifficultyBadge/Legendary/Large`

**Assets:**
- `icon-play-24.svg`
- `challenge-card-hero@2x.png`
- `difficulty-glow.json`

**Exports:**
- `figma-tokens.json`
- `components-manifest.json`
- `validation-report.json`

## Automation Setup

### GitHub Actions Integration
```yaml
name: Figma Validation
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: node design-system/validateFigma.js
        env:
          FIGMA_TOKEN: ${{ secrets.FIGMA_TOKEN }}
          FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
```

### CI/CD Pipeline
1. Figma file changes trigger webhook
2. Automated token sync
3. Component validation
4. Visual regression testing
5. Deploy to staging environment

## Success Criteria

**Automated Validation Must Pass:**
- Auto Layout compliance: 100%
- Contrast ratio compliance: 100%
- SVG icon ratio: ≥95%
- Token export: Valid JSON
- Component manifest: Complete

**Manual Review Requirements:**
- Visual design approval
- Interaction flow validation
- Accessibility testing
- Cross-browser compatibility
- Performance benchmarks

**Final Deliverables:**
- ✅ Production-ready Figma file
- ✅ Complete design token package
- ✅ Storybook component library
- ✅ Developer documentation
- ✅ Validation report (score ≥90)