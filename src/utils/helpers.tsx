import type {
  Cell,
  ElementState,
  SquareState,
  WallState,
} from '../types/project';

export enum GridMode {
  Draw,
  Plan,
}

export enum Rotation {
  Up = 'u',
  Right = 'r',
  Down = 'd',
  Left = 'l',
}

export class WallType {
  static Empty = new WallType('0', 'line-empty');
  static Wall = new WallType('w', 'line-wall');
  static Half = new WallType('h', 'line-half');

  id: string;
  className: string;

  constructor(id: string, className: string) {
    this.id = id;
    this.className = className;
  }

  getStrRepr() {
    return this.id;
  }

  getClassName() {
    return this.className;
  }

  cycle() {
    if (this.className === 'line-empty') {
      return WallType.Wall;
    } else if (this.className === 'line-wall') {
      return WallType.Half;
    } else {
      return WallType.Empty;
    }
  }

  clone() {
    return WallType.fromStrRepr(this.id);
  }

  static fromStrRepr(str: string) {
    if (str === '0') {
      return WallType.Empty;
    } else if (str === 'w') {
      return WallType.Wall;
    } else if (str === 'h') {
      return WallType.Half;
    }
    throw new URIError('Invalid SquareType string: ' + str);
  }
}

export class SquareType {
  static Empty = new SquareType('00', 'empty-tile.png', 'Empty tile');
  static CornerGrabber = new SquareType( // Default corner grabber for tally display
    'cornerGrabber',
    'corner-grabber-left.png',
    'Corner Grabber',
  );

  private static itemsData: [string, [string, string]][] = [
    ['00', ['404.png', 'Empty tile']],

    // Appliances
    ['O9', ['starter-hob.png', 'Starter Hob']],
    ['UQ', ['hob.png', 'Hob']],
    ['96', ['safety-hob.png', 'Safety Hob']],
    ['ud', ['danger-hob.png', 'Danger Hob']],
    ['JD', ['oven.png', 'Oven']],
    ['2Q', ['microwave.png', 'Microwave']],
    ['e6', ['gas-limiter.png', 'Gas Limiter']],
    ['5V', ['gas-override.png', 'Gas Override']],
    ['n2', ['starter-bin.png', 'Starter Bin']],
    ['0R', ['bin.png', 'Bin']],
    ['2V', ['compactor-bin.png', 'Compactor Bin']],
    ['Qs', ['composter-bin.png', 'Composter Bin']],
    ['70', ['expanded-bin.png', 'Expanded Bin']],
    ['ze', ['counter.png', 'Counter']],
    ['wn', ['freezer.png', 'Freezer']],
    ['E2', ['workstation.png', 'Workstation']],
    ['31', ['prep-station.png', 'Prep Station']],
    ['ot', ['frozen-prep-station.png', 'Frozen Prep Station']],
    ['ao', ['starter-plates.png', 'Starter Plates']],
    ['m2', ['plates.png', 'Plates']],
    ['hp', ['auto-plater.png', 'Autoplater']],
    ['NH', ['pot-stack.png', 'Pot Stack']],
    ['2A', ['serving-boards.png', 'Serving Boards']],
    ['94', ['woks.png', 'Woks']],
    ['3D', ['kitchen-floor-protector.png', 'Kitchen Floor Protector']],
    ['WS', ['rolling-pin.png', 'Rolling Pin']],
    ['kv', ['sharp-knife.png', 'Sharp Knife']],
    ['lq', ['dining-table.png', 'Dining Table']],
    ['tV', ['bar-table.png', 'Bar Table']],
    ['cJ', ['metal-table.png', 'Metal Table']],
    ['T2', ['table-simple-cloth.png', 'Table - Simple Cloth']],
    ['GM', ['table-fancy-cloth.png', 'Table - Fancy Cloth']],
    ['qB', ['chair.png', 'Chair']],
    ['r6', ['breadsticks.png', 'Breadsticks']],
    ['Yn', ['candle-box.png', 'Candle Box']],
    ['mD', ['napkins.png', 'Napkins']],
    ['zZ', ['sharp-cutlery.png', 'Sharp Cutlery']],
    ['CZ', ['specials-menu.png', '"Specials" Menu']],
    ['oH', ['supplies.png', 'Supplies']],
    ['3G', ['tray-stand.png', 'Tray Stand']],
    ['qC', ['coffee-table.png', 'Coffee Table']],
    ['J1', ['flower-pot.png', 'Flower Pot']],
    ['bZ', ['starter-sink.png', 'Starter Sink']],
    ['W1', ['sink.png', 'Sink']],
    ['Nt', ['soaking-sink.png', 'Soaking Sink']],
    ['v2', ['power-sink.png', 'Power Sink']],
    ['1g', ['wash-basin.png', 'Wash Basin']],
    ['xm', ['dishwasher.png', 'Dishwasher']],
    ['HD', ['mop.png', 'Mop']],
    ['VX', ['lasting-mop.png', 'Lasting Mop']],
    ['6O', ['fast-mop.png', 'Fast Mop']],
    ['9V', ['robot-mop.png', 'Robot Mop']],
    ['Ad', ['floor-buffer.png', 'Floor Buffer']],
    ['1Z', ['robot-buffer.png', 'Robot Buffer']],
    ['2M', ['dish-rack.png', 'Dish Rack']],
    ['1P', ['scrubbing-brush.png', 'Scrubbing Brush']],
    ['fU', ['conveyor.png', 'Conveyor']],
    ['BM', ['grabber.png', 'Grabber']],
    ['sC', ['smart-grabber.png', 'Smart Grabber']],
    ['3V', ['corner-grabber-left.png', 'Corner Grabber (Left)']],
    ['U7', ['corner-grabber-right.png', 'Corner Grabber (Right)']],
    ['mq', ['corner-grabber-straight.png', 'Corner Grabber (Straight)']],
    ['w5', ['combiner.png', 'Combiner']],
    ['Dg', ['portioner.png', 'Portioner']],
    ['Z9', ['mixer.png', 'Mixer']],
    ['eY', ['conveyor-mixer.png', 'Conveyor Mixer']],
    ['60', ['heated-mixer.png', 'Heated Mixer']],
    ['AY', ['rapid-mixer.png', 'Rapid Mixer']],
    ['F5', ['blueprint-cabinet.png', 'Blueprint Cabinet']],
    ['8B', ['research-desk.png', 'Research Desk']],
    ['CR', ['blueprint-desk.png', 'Blueprint Desk']],
    ['5T', ['copying-desk.png', 'Copying Desk']],
    ['4K', ['discount-desk.png', 'Discount Desk']],
    ['ZE', ['trainers.png', 'Trainers']],
    ['kF', ['wellies.png', 'Wellies']],
    ['py', ['work-boots.png', 'Work Boots']],
    ['pj', ['booking-desk.png', 'Booking Desk']],
    ['5d', ['display-stand.png', 'Display Stand']],
    ['H5', ['dumbwaiter.png', 'Dumbwaiter']],
    ['zg', ['teleporter.png', 'Teleporter']],
    ['hM', ['ordering-terminal.png', 'Ordering Terminal']],
    ['Gt', ['specials-terminal.png', 'Specials Terminal']],
    ['lu', ['door.png', 'Door']],
    ['Dq', ['elf-house.png', 'Elf House']],

    // Ingredients
    ['yi', ['apples.png', 'Apples']],
    ['hz', ['avocado.png', 'Avocado']],
    ['VN', ['banana.png', 'Banana']],
    ['J0', ['bamboo.png', 'Bamboo']],
    ['FG', ['beans.png', 'Beans']],
    ['3k', ['blueberries.png', 'Blueberries']],
    ['dG', ['broccoli.png', 'Broccoli']],
    ['EC', ['butter,png', 'Butter']],
    ['Dc', ['burger-buns.png', 'Burger Buns']],
    ['P7', ['burger-patties.png', 'Burger Patties']],
    ['Ar', ['carrots.png', 'Carrots']],
    ['zQ', ['cheese.png', 'Cheese']],
    ['HL', ['cherries.png', 'Cherries']],
    ['Ds', ['chicken.png', 'Chicken']],
    ['Xf', ['chocolate.png', 'Chocolate']],
    ['IX', ['christmas-crackers.png', 'Christmas Crackers']],
    ['rk', ['cinnamon.png', 'Cinnamon']],
    ['gh', ['clipboard-stand.png', 'Clipboard Stand']],
    ['ye', ['cocoa-powder.png', 'Cocoa Powder']],
    ['6D', ['coffee.png', 'Coffee']],
    ['jC', ['corn.png', 'Corn']],
    ['gN', ['cranberries.png', 'Cranberries']],
    ['de', ['drumstick.png', 'Drumstick']],
    ['NV', ['eggs.png', 'Eggs']],
    ['Tl', ['extra-cake-stand.png', 'Cake Stand']],
    ['Ls', ['fish.png', 'Fish']],
    ['AG', ['flour.png', 'Flour']],
    ['xn', ['garlic.png', 'Garlic']],
    ['Fr', ['honey.png', 'Honey']],
    ['B9', ['hosting-stand.png', 'Hosting Stand']],
    ['1D', ['hot-dog-buns.png', 'Hotdog Buns']],
    ['Sx', ['hot-dogs.png', 'Hotdogs']],
    ['K4', ['ice.png', 'Ice']],
    ['xQ', ['ice-dispenser.png', 'Ice Dispenser']],
    ['vu', ['ice-cream.png', 'Ice Cream']],
    ['uS', ['jalapenos.png', 'Jalapeños']],
    ['We', ['ketchup.png', 'Ketchup']],
    ['NG', ['mustard.png', 'Mustard']],
    ['Yr', ['lemon.png', 'Lemon']],
    ['SS', ['lettuce.png', 'Lettuce']],
    ['C8', ['lime.png', 'Lime']],
    ['GB', ['macaroni.png', 'Macaroni']],
    ['i9', ['mandarins.png', 'Mandarins']],
    ['uW', ['meat.png', 'Meat']],
    ['mL', ['milk.png', 'Milk']],
    ['U1', ['milk-steamer.png', 'MilkSteamer']],
    ['ag', ['noodles.png', 'Noodles']],
    ['CH', ['thick-meat.png', 'Thick Meat']],
    ['jt', ['thin-meat.png', 'Thin Meat']],
    ['E5', ['bone-in-steaks.png', 'Bone-in Steaks']],
    ['5B', ['mushrooms.png', 'Mushrooms']],
    ['Ja', ['nuts.png', 'Nuts']],
    ['Af', ['oats.png', 'Oats']], 
    ['WU', ['oil.png', 'Oil']],
    ['2o', ['olives.png', 'Olives']],
    ['fH', ['onions.png', 'Onions']],
    ['sx', ['orange-juice.png', 'Orange Juice']],
    ['mF', ['peppers.png', 'Peppers']],
    ['5M', ['pork.png', 'Pork']], 
    ['co', ['potatoes.png', 'Potatoes']],
    ['I4', ['pumpkins.png', 'Pumpkins']],
    ['Qi', ['rice.png', 'Rice']],
    ['XJ', ['seaweed.png', 'Seaweed']],
    ['wI', ['spinach.png', 'Spinach']],
    ['um', ['soy-sauce.png', 'Soy Sauce']],
    ['ps', ['strawberry.png', 'Strawberry']],
    ['zd', ['sugar.png', 'Sugar']],
    ['ZO', ['syrup.png', 'Syrup']],
    ['Vi', ['teabags.png', 'Teabags']],
    ['KE', ['teacups.png', 'Teacups']],
    ['Ix', ['tea-pot.png', 'Teapots']],
    ['1K', ['tomatoes.png', 'Tomatoes']],
    ['yb', ['tortillas.png', 'Tortillas']],
    ['ET', ['turkey.png', 'Turkey']],
    ['YX', ['vinegar.png', 'Vinegar']],
    ['0s', ['wine.png', 'Wine']],
    ['BS', ['whipping-cream.png', 'Whipping Cream']],

    // Other
    ['UJ', ['extra-life.png', 'Extra Life']],
    ['qV', ['plant.png', 'Plant']],
  ];

  private static idMap = new Map(this.itemsData);

  id: string;
  imagePath: string;
  imageAlt: string;
  rotation: Rotation;

  constructor(
    id: string,
    imagePath: string,
    imageAlt: string,
    rotation?: Rotation,
  ) {
    this.id = id;
    this.imagePath = imagePath;
    this.imageAlt = imageAlt;

    if (rotation) {
      this.rotation = rotation;
    } else {
      this.rotation = Rotation.Up;
    }
  }

  getStrRepr() {
    return this.id + `${this.rotation}`;
  }

  getImageMenuPath() {
    return '/images/menu/' + this.imagePath;
  }

  getImageDisplayPath() {
    return '/images/display/' + this.imagePath;
  }

  getImageAlt() {
    return this.imageAlt;
  }

  getOrder() {
    for (let i = 0; i < SquareType.itemsData.length; i++) {
      if (SquareType.itemsData[i][0] === this.id) {
        return i;
      }
    }
  }

  getTransform() {
    if (this.rotation === Rotation.Right) {
      return 'rotate(90deg)';
    } else if (this.rotation === Rotation.Down) {
      return 'rotate(180deg)';
    } else if (this.rotation === Rotation.Left) {
      return 'rotate(270deg)';
    } else {
      return 'rotate(0deg)';
    }
  }

  rotateLeft() {
    if (this.rotation === Rotation.Up) {
      this.rotation = Rotation.Left;
    } else if (this.rotation === Rotation.Left) {
      this.rotation = Rotation.Down;
    } else if (this.rotation === Rotation.Down) {
      this.rotation = Rotation.Right;
    } else {
      this.rotation = Rotation.Up;
    }
  }

  rotateRight() {
    if (this.rotation === Rotation.Up) {
      this.rotation = Rotation.Right;
    } else if (this.rotation === Rotation.Right) {
      this.rotation = Rotation.Down;
    } else if (this.rotation === Rotation.Down) {
      this.rotation = Rotation.Left;
    } else {
      this.rotation = Rotation.Up;
    }
  }

  clone() {
    const item = new SquareType(this.id, this.imagePath, this.imageAlt);
    item.rotation = this.rotation;
    return item;
  }

  static getAllItems() {
    const allItems: SquareType[] = [];

    this.idMap.forEach((value, key) => {
      if (key !== SquareType.Empty.id) {
        allItems.push(
          new SquareType(key, value[0] as string, value[1] as string),
        );
      }
    });
    return allItems;
  }

  static fromStrRepr(strRepr: string) {
    const itemId = strRepr.slice(0, 2);
    const rotationStr = strRepr.slice(2, 3);

    if (itemId === SquareType.Empty.id) {
      return SquareType.Empty;
    }
    if (this.idMap.has(itemId)) {
      const value = this.idMap.get(itemId);
      const square = new SquareType(
        itemId,
        value?.[0] as string,
        value?.[1] as string,
      );
      square.rotation = rotationStr as Rotation;
      return square;
    }
    throw new URIError('Invalid SquareType string: ' + strRepr);
  }
}

export const areSameCell = (cell1: Cell, cell2: Cell) =>
  cell1[0] === cell2[0] && cell1[1] === cell2[1];

export const isSquareState = (state: ElementState): state is SquareState =>
  (state as SquareState).squareType !== undefined;

export const isWallState = (state: ElementState): state is WallState =>
  (state as WallState).wallType !== undefined;

export enum DrawDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  None = 'none', // For wall corners
}

export const getDirection = (cell: Cell) => {
  if (cell[0] % 2 === 0 && cell[1] % 2 === 0) {
    throw Error("Can't get direction of a square cell");
  } else if (cell[0] % 2 === 0) {
    return DrawDirection.Horizontal;
  } else if (cell[1] % 2 === 0) {
    return DrawDirection.Vertical;
  } else {
    return DrawDirection.None;
  }
};

export const isTouchDevice = () =>
  'ontouchstart' in window || window.navigator.maxTouchPoints > 0;

export const isSingleTouch = (event: React.TouchEvent) =>
  event.touches.length <= 1 &&
  event.targetTouches.length <= 1 &&
  event.changedTouches.length <= 1;

export const getTouchedPosition = (e: React.TouchEvent) => {
  const { clientX, clientY } = e.targetTouches[0];
  const maybeGrid = document.elementFromPoint(clientX, clientY)?.parentElement;
  return [
    +(maybeGrid?.dataset.row ?? -1),
    +(maybeGrid?.dataset.col ?? -1),
  ] as Cell;
};

export const getTouchedWall = (e: React.TouchEvent) => {
  const { clientX, clientY } = e.targetTouches[0];
  const maybeWall = document.elementFromPoint(clientX, clientY) as HTMLElement;
  return [
    +(maybeWall?.dataset.wallRow ?? -1),
    +(maybeWall?.dataset.wallCol ?? -1),
  ] as Cell;
};

export const createMouseEvent = (name: string, config: MouseEventInit = {}) =>
  new window.MouseEvent(name, {
    button: 0,
    bubbles: true,
    cancelable: true,
    view: window,
    ...config,
  });
