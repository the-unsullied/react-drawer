# react-fancy-field

*A modern styled input field with animating effects built for React. Has built in validation effects.*

## Install
```
npm install unsullied-react-drawer --save
```

## Usage
```
  import Drawer from 'unsullied-react-drawer';

  React.createClass({

    render() {
      return <Drawer isOpen={true}
            className='my-class-name'
            header='This is a great header'>
          <ul>
            <li>Information 1</li>
            <li>Information 2</li>
            <li>Information 3</li>
          </ul>
      </Drawer>
    }
  });
```


## Params

**isOpen** {Boolean} initial state of drawer. Can set this to open programatically.

**header** {String} What appears in header of drawer.



## Drawer Icons

To get drawers to have icons, you will need the following classes defined with corresponding images in path

```
.unsullied-icon-chevron-up {
  background-image: url('/path/to/img/unsullied-chevron-up.svg');
  background-repeat: no-repeat;
  @include vendor('transform', scale(0.75)); // can omit this or edit scale multiplier as necessary
  height: 25px;
}
.unsullied-icon-chevron-down {
  background-image: url('/path/to/img/unsullied-chevron-down.svg');
  background-repeat: no-repeat;
  @include vendor('transform', scale(0.75)); // can omit this or edit scale multiplier as necessary
  height: 25px;
}
```

To edit the color of the icons, you can edit the svg directly by adding a fill property of the color of your choice:

```
 <path d="M16.585 8.585l-4.585 4.585-4.585-4.585-1.415 1.415 6 6 6-6z" fill='#999999'></path>
```
