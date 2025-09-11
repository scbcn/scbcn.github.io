# Schedule Instructions for Software Crafters Barcelona Website

## Overview
This document provides instructions for understanding and modifying the conference schedule structure in the Software Crafters Barcelona website (`index.html`). This guide is designed to be compatible with AI assistants including GPT-4 and Gemini.

## Data Sources

### 1. Agenda JSON Structure
The schedule data comes from `agenda.json` which contains two main arrays:

```json
{
    "slots": [...],     // Conference talks/presentations  
    "version": null,    
    "breaks": [...]     // Breaks, networking, sponsor slots
}
```

#### Slot Schema (Conference Talks)
```json
{
    "code": "string",           // Unique identifier
    "speakers": [...],          // Array of speaker objects
    "title": "string",          // Talk title
    "submission_type": {"en": "Talk|Lightning talk"},
    "submission_type_id": 1|2,  // 1=Talk, 2=Lightning talk
    "track": {"en": "string"},  // Track category
    "track_id": number,         // Numeric track ID
    "state": "confirmed",       // Status
    "abstract": "string",       // Talk description
    "duration": number,         // Duration in minutes
    "slot": {                   // Timing and room info
        "room_id": number,
        "room": {"en": "Track1|Track 2|Track 3|Track 4"},
        "start": "2025-10-25T16:00:00+02:00",  // ISO datetime
        "end": "2025-10-25T16:55:00+02:00"
    },
    "is_featured": boolean,     // Keynote flag
    // ... other fields
}
```

#### Break Schema (Simple Events)
```json
{
    "room": {"en": "string"},   // Room name
    "room_id": number,          // Room ID
    "start": "string",          // ISO datetime
    "end": "string",            // ISO datetime  
    "description": {"en": "string"}  // Event description
}
```

## HTML Schedule Structure

### Main Container
```html
<section class="page-section" id="schedule">
    <div class="container">
        <h1 class="section-title">Schedule</h1>
        <div class="schedule-wrapper">
            <!-- Two-level tab structure -->
        </div>
    </div>
</section>
```

### Two-Day Tab Structure

#### Level 1: Day Selection
```html
<div class="schedule-tabs lv1">
    <ul id="tabs-lv1" class="nav nav-justified">
        <li class="active">
            <a href="#tab-first" data-toggle="tab">
                <strong>Friday</strong><br />25.10.2024
            </a>
        </li>
        <li>
            <a href="#tab-second" data-toggle="tab">
                <strong>Saturday</strong><br />26.10.2024
            </a>
        </li>
    </ul>
</div>
```

#### Friday (Open Space) - Timeline Format
```html
<div id="tab-first" class="tab-pane fade in active">
    <div class="timeline">
        <article class="post-wrap">
            <div class="media">
                <div class="schedule-width">
                    <div class="post-header">
                        <div class="post-meta">
                            <span class="post-date">
                                <i class="fa fa-clock-o"></i> 17:00 - 17:25
                            </span>
                        </div>
                        <h2 class="post-title">Registration</h2>
                    </div>
                </div>
            </div>
        </article>
        <!-- More timeline articles -->
    </div>
</div>
```

#### Saturday (Conference) - Table Format
```html
<div id="tab-second" class="tab-pane fade table-responsive">
    <table class="table table-bordered table-striped">
        <thead>
            <tr>
                <th></th>  <!-- Time column -->
                <th>Track 1</th>
                <th>Track 2</th>
                <th>Track 3</th>
                <th><img src="assets/img/sponsors/manfred-color.svg" alt="Manfred" height="40" /></th>
            </tr>
        </thead>
        <tbody>
            <!-- Time slot rows with 4 track columns each -->
        </tbody>
    </table>
</div>
```

## Talk Cell Structure

### Standard Talk Cell
```html
<td onclick="window['talk-dialog-id'].showModal()">
    <img class="language-flag" src="assets/img/gb_circle.svg" alt="English" />
    Talk Title<br>
    <span class="author">
        <img src="speaker-avatar.jpg" alt="Speaker Name" />
        Speaker Name
    </span>
    <dialog id="talk-dialog-id">
        <div class="post-excerpt">
            <h2 class="post-title">Full Talk Title</h2>
            <p>Detailed description...</p>
        </div>
        <form method="dialog">
            <button class="dialog-feedback" onclick="window.open('feedback-url', '_blank')">
                Feedback
            </button>
            <button class="dialog-close">Close</button>
        </form>
    </dialog>
</td>
```

### Lightning Talks Cell
```html
<td class="lightning-talks">
    <h4>⚡ Lightning Talks</h4>
    <div onclick="window['lightning-dialog-id'].showModal()">
        <img class="language-flag" src="assets/img/es_circle.svg" alt="Spanish" />
        11:30 - 11:40 | Talk Title<br>
        <span class="author">
            <img src="speaker-avatar.jpg" alt="Speaker" />Speaker Name
        </span>
        <dialog id="lightning-dialog-id">
            <!-- Dialog content -->
        </dialog>
    </div>
    <!-- Multiple lightning talks in same cell -->
</td>
```

### Special Section Cell
```html
<td colspan="4" class="special-section">Registration</td>
<td colspan="4" class="special-section">Lunch</td>
<td colspan="4" class="special-section">Break</td>
```

**Note**: Colspan value must match the number of track columns (currently 4). When adding/removing tracks, update these values accordingly.

## Key CSS Classes

- `time-block`: Time column cells
- `special-section`: Full-width special events (breaks, meals)
- `lightning-talks`: Column containing multiple short talks
- `language-flag`: Language indicator icons
- `author`: Speaker information container
- `dialog-feedback`: Feedback button in modals
- `dialog-close`: Close button in modals

## Dialog ID Patterns

- Standard talks: `talk-2-1-1-dialog` (format: talk-day-track-slot-dialog)
  - Day is always "2" for Saturday conference
  - Track numbers: 1, 2, 3, 4 (corresponding to the 4 track columns)
  - Slot numbers increment within each track (1, 2, 3, etc.)
- Lightning talks: `talk-lightning-1-dialog`, `talk-lightning-2-dialog`, etc.
- Keynote: `keynote` (unique special event)
- Unique IDs required for each talk to enable modal functionality

**Important**: When adding/removing tracks, ensure dialog IDs follow the sequential pattern and remain unique across the entire schedule.

## Language Support

- **Spanish**: `assets/img/es_circle.svg`
- **English**: `assets/img/gb_circle.svg`
- Used as `<img class="language-flag" src="..." alt="Language" />`

## Room/Track Mapping

### Current Structure (4 Tracks)
Based on agenda.json room_id values and current table structure:
- Room ID 4: Track 1  
- Room ID 5: Track 2
- Room ID 6: Track 3
- Room ID 4: Manfred (Sponsor column - functions as Track 4)

### Track Column Structure
The Saturday schedule table has exactly 5 columns:
1. **Time Block** (empty header): Contains time ranges like "11:30 - 12:25"
2. **Track 1**: Main conference track
3. **Track 2**: Main conference track  
4. **Track 3**: Main conference track
5. **Manfred Sponsor Column**: Functions as Track 4, displays sponsor logo in header

### Dialog ID Patterns for Tracks

Current naming convention:
- **Standard talks**: `talk-2-{track}-{slot}-dialog`
  - `talk-2-1-1-dialog`: Day 2, Track 1, Slot 1
  - `talk-2-1-2-dialog`: Day 2, Track 1, Slot 2
  - `talk-2-2-1-dialog`: Day 2, Track 2, Slot 1
  - `talk-2-3-1-dialog`: Day 2, Track 3, Slot 1
  - `talk-2-4-1-dialog`: Day 2, Track 4 (Manfred column), Slot 1

- **Lightning talks**: Sequential numbering
  - `talk-lightning-1-dialog`, `talk-lightning-2-dialog`, etc.

- **Special events**: Unique descriptive IDs
  - `keynote`: Main keynote presentation

### Adding/Removing Tracks

#### To Add a New Track Column:
1. **Update Table Header**: Add new `<th>` element with sponsor logo or track name
2. **Update Special Section Colspan**: Change `colspan="4"` to `colspan="5"` for:
   - Registration sections
   - Break sections  
   - Lunch sections
   - Keynote section
3. **Add Track Content**: Create `<td>` elements in each time slot row with appropriate talks
4. **Update Dialog IDs**: Follow pattern `talk-2-{track_number}-{slot}-dialog`
5. **Test Modal Functionality**: Ensure all new dialogs open/close properly

#### To Remove a Track Column:
1. **Remove Table Header**: Delete the corresponding `<th>` element
2. **Update Special Section Colspan**: Decrease colspan value by 1 for all special sections
3. **Remove Track Content**: Delete all `<td>` elements for that track from every row
4. **Remove Dialogs**: Clean up all dialog elements with IDs matching the removed track
5. **Verify Structure**: Ensure all rows have consistent column count

#### Column Count Management:
- **Current**: 5 total columns (1 time + 4 tracks)
- **Special sections**: Use `colspan="4"` to span all track columns
- **Adding track**: Increment colspan to `colspan="5"`
- **Removing track**: Decrement colspan to `colspan="3"`

### Track Content Cell Structure:
```html
<td onclick="window['talk-2-{track}-{slot}-dialog'].showModal()">
    <img class="language-flag" src="assets/img/{lang}_circle.svg" alt="{Language}" />
    {Talk Title}<br>
    <span class="author">
        <img src="{speaker_avatar}" alt="{Speaker Name}" />
        {Speaker Name}
    </span>
    <dialog id="talk-2-{track}-{slot}-dialog">
        <!-- Dialog content -->
    </dialog>
</td>
```

## Sponsor Integration

Track headers display sponsor logos:
```html
<th><img src="assets/img/sponsors/sponsor-name.svg" alt="Sponsor" height="40" /></th>
```

Common sponsors: AXA, Lifull Connect, Edpuzzle, Voxel, SCRM-Lidl, Manfred, Audiense, etc.

## Responsive Design

- Table becomes horizontally scrollable on small screens via `table-responsive` class
- Timeline format on Friday is inherently mobile-friendly

## Interactive Features

1. **Modal Dialogs**: Click any talk to open detailed description
2. **Feedback Integration**: Google Forms links in talk modals
3. **Social Links**: Twitter/X handles for speakers when available
4. **Sponsor Links**: Clickable sponsor logos in track headers

## Best Practices for Modifications

1. **Maintain Dialog ID Uniqueness**: Each talk needs a unique dialog ID
2. **Preserve Language Flags**: Always include appropriate language indicators
3. **Keep Sponsor Visibility**: Maintain sponsor logo placement and sizing
4. **Follow Time Format**: Use consistent "HH:MM - HH:MM" format
5. **Include Speaker Avatars**: Maintain visual speaker representation
6. **Test Modal Functionality**: Ensure dialog open/close works after changes

## Common Modification Tasks

### Track Management
1. **Adding New Track Column**: 
   - Add `<th>` header with track name or sponsor logo
   - Add `<td>` cells in all time slot rows
   - Update all `colspan` values in special sections (+1)
   - Follow dialog ID pattern: `talk-2-{new_track_number}-{slot}-dialog`

2. **Removing Track Column**:
   - Remove `<th>` header for the track
   - Remove all `<td>` cells for that track from every row  
   - Update all `colspan` values in special sections (-1)
   - Remove all associated dialog elements
   - Verify no broken dialog references remain

3. **Reordering Tracks**: 
   - Rearrange `<th>` headers in desired order
   - Rearrange corresponding `<td>` cells in all rows
   - Update dialog IDs to match new track positions

### Content Management  
4. **Adding New Talk**: Create table cell with dialog, update speaker info
5. **Changing Time Slots**: Update both time-block cells and internal times
6. **Updating Sponsors**: Replace sponsor logos and links in headers
7. **Language Changes**: Update language flags and alt text
8. **Speaker Updates**: Modify speaker names, avatars, and social links

### Validation Checklist After Track Changes
- [ ] All rows have same number of `<td>` elements
- [ ] Special sections use correct `colspan` value
- [ ] All dialog IDs are unique and follow naming convention
- [ ] Modal open/close functionality works for all talks
- [ ] Table structure is visually consistent
- [ ] No orphaned dialog elements remain

This structure enables a rich, interactive conference schedule that scales across devices while maintaining sponsor visibility and user engagement.
