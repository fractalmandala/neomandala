---
title: Bard components
---

```javascript
// Elements

const Button = {
  name: "Button",
  props: {},
  template: `
    <button class="ui button">
      <slot></slot>
    </button>
  `,
};

const Container = {
  name: "Container",
  props: {},
  template: `
    <div class="ui container">
      <slot></slot>
    </div>
  `,
};

const Divider = {
  name: "Divider",
  props: {},
  template: `
    <hr class="ui divider">
  `,
};

const Flag = {
  name: "Flag",
  props: {},
  template: `
    <div class="ui flag">
      <slot></slot>
    </div>
  `,
};

const Header = {
  name: "Header",
  props: {},
  template: `
    <h1 class="ui header">
      <slot></slot>
    </h1>
  `,
};

const Icon = {
  name: "Icon",
  props: {},
  template: `
    <i class="ui icon">
      <slot></slot>
    </i>
  `,
};

const Image = {
  name: "Image",
  props: {},
  template: `
    <img class="ui image">
      <slot></slot>
    </img>
  `,
};

const Label = {
  name: "Label",
  props: {},
  template: `
    <label class="ui label">
      <slot></slot>
    </label>
  `,
};

const List = {
  name: "List",
  props: {},
  template: `
    <ul class="ui list">
      <slot></slot>
    </ul>
  `,
};

const Loader = {
  name: "Loader",
  props: {},
  template: `
    <div class="ui loader">
      <slot></slot>
    </div>
  `,
};

const Placeholder = {
  name: "Placeholder",
  props: {},
  template: `
    <div class="ui placeholder">
      <slot></slot>
    </div>
  `,
};

const Rail = {
  name: "Rail",
  props: {},
  template: `
    <div class="ui rail">
      <slot></slot>
    </div>
  `,
};

const Reveal = {
  name: "Reveal",
  props: {},
  template: `
    <div class="ui reveal">
      <slot></slot>
    </div>
  `,
};

const Segment = {
  name: "Segment",
  props: {},
  template: `
    <div class="ui segment">
      <slot></slot>
    </div>
  `,
};

const Step = {
  name: "Step",
  props: {},
  template: `
    <div class="ui step">
      <slot></slot>
    </div>
  `,
};

// Collections

const Advertisement = {
  name: "Advertisement",
  props: {},
  template: `
    <div class="ui advertisement">
      <slot></slot>
    </div>
  `,
};

const Card = {
  name: "Card",
  props: {},
  template: `
    <div class="ui card">
      <slot></slot>
    </div>
  `,
};

const Comment = {
  name: "Comment",
  props: {},
  template: `
    <div class="ui comment">
      <slot></slot>
    </div>
  `,
};

const FeedItem = {
  name: "FeedItem",
  props: {},
  template: `
    <div class="ui feed item">
      <slot></slot>
    </div>
  `,
};

const Statistic = {
  name: "Statistic",
  props: {},
  template: `
    <div class="ui statistic">
      <slot></slot>
    </div>
  `,
};

// Views

const App = {
  name: "App",
  props: {},
  template: `
    <div class="ui app">
      <slot></slot>
    </div>
  `,
};

const Footer = {
  name: "Footer",
  props: {},
  template: `
    <div class="ui footer">
      <slot></slot>
    </div>
  `,
};

const Navbar = {
  name: "Navbar",
  props: {},
  template: `
    <nav class="ui navbar">
      <a class="ui navbar item">
        <i class="home icon"></i>
        Home
      </a>
      <a class="ui navbar item">
        About
      </a>
      <a class="ui navbar item">
        Contact
      </a>
    </nav>
  `,
};

const Sidebar = {
  name: "Sidebar",
  props: {},
  template: `
    <div class="ui sidebar">
      <h1 class="ui header">Sidebar</h1>
      <ul class="ui list">
        <li><a class="ui item">Link 1</a></li>
        <li><a class="ui item">Link 2</a></li>
        <li><a class="ui item">Link 3</a></li>
      </ul>
    </div>
  `,
};

// Modules

const Accordion = {
  name: "Accordion",
  props: {},
  template: `
    <div class="ui accordion">
      <div class="ui accordion item">
        <h3 class="ui header">
          <i class="dropdown icon"></i>
          Title
        </h3>
        <div class="content">
          <p>
            This is the content of the accordion item.
          </p>
        </div>
      </div>
      <div class="ui accordion item">
        <h3 class="ui header">
          <i class="dropdown icon"></i>
          Title
        </h3>
        <div class="content">
          <p>
            This is the content of the accordion item.
          </p>
        </div>
      </div>
    </div>
  `,
};

const Ad = {
  name: "Ad",
  props: {},
  template: `
    <div class="ui ad">
      <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350x250&w=350&h=250" alt="Ad">
    </div>
  `,
};

const Api = {
  name: "Api",
  props: {},
  template: `
    <div class="ui api">
      <h1 class="ui header">API</h1>
      <ul class="ui list">
        <li><a class="ui item">Endpoint 1</a></li>
        <li><a class="ui item">Endpoint 2</a></li>
        <li><a class="ui item">Endpoint 3</a></li>
      </ul>
    </div>
  `,
};

export {
  Button,
  Container,
  Divider,
  Flag,
  Header,
  Icon,
  Image,
  Label,
  List,
  Loader,
  Placeholder,
  Rail,
  Reveal,
  Segment,
  Step,
  Advertisement,
  Card,
  Comment,
  FeedItem,
  Statistic,
  App,
  Footer,
  Navbar,
  Sidebar,
  Accordion,
  Ad,
  Api,
};
```

```html
<Button>Click Me</Button>

<Container>
  <h1>This is a container</h1>
</Container>


<Divider />

<Flag>
  <h1>This is a flag</h1>
</Flag>

<Header>
  <h1>This is a header</h1>
</Header>

<Icon>
  <i class="home icon"></i>
</Icon>


<Image src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350x250&w=350&h=250" alt="Image">
</Image>


<Label>
  <h1>This is a label</h1>
</Label>

<List>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</List>

<Loader />


<Placeholder>
  <h1>This is a placeholder</h1>
</Placeholder>

<Rail>
  <h1>This is a rail</h1>
</Rail>

<Reveal>
  <h1>This is a reveal</h1>
</Reveal>

<Segment>
  <h1>This is a segment</h1>
</Segment>

<Step>
  <h1>This is a step</h1>
</Step>

<Advertisement>
  <h1>This is an advertisement</h1>
</Advertisement>

<Card>
  <h1>This is a card</h1>
</Card>

<Comment>
  <h1>This is a comment</h1>
</Comment>

<FeedItem>
  <h1>This is a feed item</h1>
</FeedItem>

<Statistic>
  <h1>This is a statistic</h1>
</Statistic>

<App>
  <h1>This is an app</h1>
</App>

<Footer>
  <h1>This is a footer</h1>
</Footer>

<Navbar>
  <a class="ui navbar item">
    <i class="home icon"></i>
    Home
  </a>
  <a class="ui navbar item">
    About
  </a>
  <a class="ui navbar item">
    Contact
  </a>
</Navbar>

<Sidebar>
  <h1 class="ui header">Sidebar</h1>
  <ul class="ui list">
    <li><a class="ui item">Link 1</a></li>
    <li><a class="ui item">Link 2</a></li>
    <li><a class="ui item">Link 3</a></li>
  </ul>
</Sidebar>

<Accordion>
  <div class="ui accordion">
    <div class="ui accordion item">
      <h3 class="ui header">
        <i class="dropdown icon"></i>
        Title
      </h3>
      <div class="content">
        <p>
          This is the content of the accordion item.
        </p>
```

