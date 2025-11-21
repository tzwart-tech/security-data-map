# Secutiry Data Map

## How To Run

- install using node 20.14.0
- install packages using pnpm
- run dev commmand

```
pnpm install
pnpm run dev
```

## Time-Spent

- 4 Hours

## Assumptions Made

- The file seemd to have not only had overlapping categories, but also some overlapping systems.
  - I made the assumption that data could ponentially both have slight difference but both could be relevant. So duplicates were removed and mapped to one single node.
- Found an additional System Type of Service. I assumed it was neccessary to keep.
- It was assummed on filtering we would like to keep all data of the system although it was not part of the current filtering.
- Assumed that Systems without data_categories should also be shown while un-filtered

## Trade-offs

- Made Use of map and set data-structure to keep all data, withou duplications (such ad ovelap in categories and system declarations)
- Annonymized the systems data type to make the same type work for both layouts
- Use hooks to split out code that would be used in mutliple parts of the application

## Any special/unique features you addded

- Added collapsible description

## Feedback

- I thought this was a really great challenge.
