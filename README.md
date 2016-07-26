# react-drawer

*A toggle drawer to hide/show other content built for React.*

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

**header** {Any} What appears in header of drawer.



## Drawer Icons

To get drawers to have icons, you will need the following classes defined with corresponding images in path

```
.unsullied-icon-chevron-up {
  background-image: url('/path/to/img/unsullied-chevron-up.svg');
  @include vendor('transform', scale(0.75)); // can omit this or edit scale multiplier as necessary
}
.unsullied-icon-chevron-down {
  background-image: url('/path/to/img/unsullied-chevron-down.svg');
  @include vendor('transform', scale(0.75)); // can omit this or edit scale multiplier as necessary
}
```
