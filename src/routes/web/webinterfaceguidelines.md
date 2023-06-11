---
title: Web Interface Guidelines
tags: design
featured: true
type: ui
image: https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp
description: sheer paste of content from interfaces.rauno.me
id: 22
---

##### sheer paste of content from <a href="https://interfaces.rauno.me/" target="_blank" rel="noreferrer">here</a>

#### Introduction

This document outlines a non-exhaustive list of details that make a good (web) interface. It is a living document, periodically updated based on learnings. Some of these may be subjective, but most apply to all websites.

The WAI-ARIA spec is deliberately not duplicated in this document. However, some accessibility guidelines may be pointed out. Contributions are welcome. Edit this file and submit a pull request.

#### Interactivity

- Clicking the input label should focus the input field
- Inputs should be wrapped with a `<form>` to submit by pressing Enter
- Inputs should have an appropriate type like password, email, etc
- Inputs should disable spellcheck and autocomplete attributes most of the time
- Inputs should leverage HTML form validation by using the required attribute when appropriate
- Input prefix and suffix decorations, such as icons, should be absolutely positioned on top of the text input with padding, not next to it, and trigger focus on the input
- Toggles should immediately take effect, not require confirmation
- Buttons should be disabled after submission to avoid duplicate network requests
- Interactive elements should disable user-select for inner content
- Decorative elements (glows, gradients) should disable pointer-events to not hijack events

#### Typography

- Fonts should have -webkit-font-smoothing: antialiased applied for better legibility
- Fonts should have text-rendering: optimizeLegibility applied for better legibility
- Fonts should be subset based on the content, alphabet or relevant language(s)
- Font weight should not change on hover or selected state to prevent layout shift
- Font weights below 400 should not be used
- Medium sized headings generally look best with a font weight between 500-600
- Adjust values fluidly by using CSS clamp(), e.g. clamp(48px, 5vw, 72px) for the font-size of a heading

#### Motion

- Switching themes should not trigger transitions and animations on elements
- Animation duration should not be more than 200ms for interactions to feel immediate
- Animation values should be proportional to the trigger size:
- Don't animate dialog scale in from 0 → 1, fade opacity and scale from ~0.8
- Don't scale buttons on press from 1 → 0.8, but ~0.96, ~0.9, or so
- Actions that are frequent and low in novelty should avoid extraneous animations:
  1.  Opening a right click menu
  2.  Deleting or adding items from a list
  3.  Hovering trivial buttons
  4.  Looping animations should pause when not visible on the screen to offload CPU and GPU usage

#### Touch

- Hover states should not be visible on touch press, use @media (hover: hover)
- Font size for inputs should not be smaller than 16px to prevent iOS zooming on focus
- Inputs should not auto focus on touch devices as it will open the keyboard and cover the screen
- Apply muted and playsinline to `<video>` tags to auto play on iOS
- Disable touch-action for custom components that implement pan and zoom gestures to prevent interference from native behavior like zooming and scrolling

#### Optimizations

- Large blur() values for filter and backdrop-filter may be slow
- Scaling and blurring filled rectangles will cause banding, use radial gradients instead
- Sparingly enable GPU rendering with transform: translateZ(0) for unperformant animations
- Toggle will-change on unperformant scroll animations for the duration of the animation
- Auto-playing too many videos on iOS will choke the device, pause or even unmount off-screen videos
- Bypass React's render lifecycle with refs for real-time values that can commit to the DOM directly
- Detect and adapt to the hardware and network capabilities of the user's device

#### Accessibility

- Disabled buttons should not have tooltips, they are not accessible
- Box shadow should be used for focus rings, not outline which won’t respect radius
- Focusable elements in a sequential list should be navigable with ↑ ↓
- Focusable elements in a sequential list should be deletable with ⌘ Backspace
- To open immediately on press, dropdown menus should trigger on mousedown, not click
- Use a svg favicon with a style tag that adheres to the system theme based on prefers-color-scheme
- Icon only interactive elements should define an explicit aria-label
- Tooltips triggered by hover should not contain interactive content
- Images should always be rendered with `<img>` for screen readers and ease of copying from the right click menu
- Illustrations built with HTML should have an explicit aria-label instead of announcing the raw DOM tree to people using screen readers
- Gradient text should unset the gradient on ::selection state

#### Design

- Optimistically update data locally and roll back on server error with feedback
- Authentication redirects should happen on the server before the client loads to avoid janky URL changes
- Style the document selection state with ::selection
- Display feedback relative to its trigger:
  1. Show a temporary inline checkmark on a successful copy, not a notification
  2. Highlight the relevant input(s) on form error(s)
  3. Empty states should prompt to create a new item, with optional templates
  4. Switching between dark mode or light mode will trigger transitions on elements that are meant for explicit interactions like hover. We can disable transitions temporarily to prevent this. For Next.js, use next-themes which prevents transitions out of the box.
  5. This is a matter of taste but some interactions just feel better with no motion. For example, the native macOS right click menu only animates out, not in, due to the frequent usage of it.
  6. Most touch devices on press will temporarily flash the hover state, unless explicitly only defined for pointer devices with @media (hover: hover).
  7. Use will-change as a last resort to improve performance. Pre-emptively throwing it on elements for better performance may have the opposite effect.
  8. This might be controversial but sometimes it can be beneficial to manipulate the DOM directly. For example, instead of relying on React re-rendering on every wheel event, we can track the delta in a ref and update relevant elements directly in the callback.
  9. Disabled buttons do not appear in tab order in the DOM so the tooltip will never be announced for keyboard users and they won't know why the button is disabled.
  10. As of 2023, Safari will not take the border radius of an element into account when defining custom outline styles. Safari 16.4 has added support for outline following the curve of border radius. However, keep in mind that not everyone updates their OS immediately.
