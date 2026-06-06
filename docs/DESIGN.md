# BeatHub Design Document

## Data Relationships
- Artist is the parent entity.
- Album references Artist.
- Song references Album and Artist.
- User is independent.
- Playlist references User and contains Song references.

## Design Decisions

### Why did you reference Songs in Playlist instead of embedding?
Referencing avoids duplication and ensures that changes to a song
automatically reflect in all playlists.

### Why did you reference Artist in Song?
This allows fast artist-based queries without traversing albums,
improving performance and query simplicity.
