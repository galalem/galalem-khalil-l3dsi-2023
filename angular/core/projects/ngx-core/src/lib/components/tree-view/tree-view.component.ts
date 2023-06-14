import { Component, ContentChild, Directive, Input, TemplateRef } from '@angular/core';


export interface TreeNode {
  id:number;
  value:any;
  parent:number|null|undefined|false;
}
class TreeBransh {
  private _id:TreeNode['id'];
  private _value:TreeNode['value'];
  private _parent:TreeNode['parent'];

  private _children:TreeBransh[] = [];
  private _updated:boolean = true;
  private _childrenCount:number = 0;
  private _leafs:number = 0;
  column:number = 1;
  row:number = 1;
  position:-2|-1|0|1|2 = 0;
  extreme:boolean = false;
  single:boolean = false;

  public get id() {
    return this._id
  }
  public get value() {
    return this._value
  }
  public get parent() {
    return this._parent
  }
  public get parentNullSafe():number {
    if (this._parent === null || this._parent === undefined || this._parent === false)
      return -1;
    return this._parent;
  }

  public set children(value:TreeBransh[]) {
    this._children = value;
    this._updated = false;
  }
  public get children() {
    return this._children;
  }
  public insert(child:TreeBransh) {
    this._children.push(child);
    this._updated = false;
  }

  constructor(node:TreeNode, children:TreeBransh[]){
    this._id = node.id;
    this._value = node.value;
    this._parent = node.parent;
    this.children = children;
  }

  public get isRoot() {
    return !this._parent;
  }

  public get isParent() {
    return this.children.length > 0;
  }
  public get isLeaf() {
    return this.leafs == 0;
  }
  public get leafs() {
    if (!this._updated)
      this.refresh();
    return this._leafs;
  }
  public get childrenCount() {
    if (!this._updated)
      this.refresh();
    return this._childrenCount;
  }

  private refresh() {
    this._leafs = 0;
    this._childrenCount = 0;
    this._children.forEach(child => {
      this._leafs += Math.max(1, child.leafs);
      this._childrenCount += child.childrenCount;
    });
    this._updated = true;
  }
}

@Directive({
  selector: "[nodes]"
})
export class NodesDirective {
  constructor(public template:TemplateRef<any>) {}
}

@Component({
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent {

  LEFT:-2 = -2;
  CENTER_LEFT:-1 = -1;
  CENTER:0 = 0;
  CENTER_RIGHT:1 = 1;
  RIGHT:2 = 2;

  columns:number=0;
  data:TreeBransh[] = [];
  @ContentChild(NodesDirective) content!: NodesDirective;

  @Input("style-native")
  styleNative:string = "";
  @Input("data")
  set _data(array:TreeNode[]) {
    let map:any = {};
    let roots:TreeBransh[] = [];
    this.data = array.map((node, index) => {map[node.id] = index; return new TreeBransh(node, [])})
      .filter((node, index, tree) => {
        if (node.isRoot)
          roots.push(node);
        else if (map.hasOwnProperty(node.parentNullSafe))
          tree[map[node.parentNullSafe]].insert(node);
        return true;
      }).sort((a, b) => {
        if (a.parentNullSafe === b.parentNullSafe)
          return a.id - b.id;
        return a.parentNullSafe - b.parentNullSafe
      }).filter((node, i, tree) => {
        const length = node.children.length;
        const hasCenter = length % 2 === 1;
        const center = (hasCenter ? length - 1 : length) / 2;
        if (node.isRoot) {
          node.column = i === 0 ? 1 : tree[i-1].column + Math.max(tree[i-1].leafs, 1);
          node.row = 1;
        }
        
        node.children.sort((a, b) => a.id - b.id).forEach((subnode, index, children) => {
          subnode.column = index === 0 ? node.column : children[index - 1].column + Math.max(children[index - 1].leafs, 1);
          subnode.row = node.row + 1;

          if (length === 1)
            subnode.single = true;
          if (index === 0 || index === length - 1)
            subnode.extreme = true;
          if (hasCenter) {
            if (index < center)
              subnode.position = this.LEFT;
            else if (index > center)
              subnode.position = this.RIGHT;
            else
              subnode.position = this.CENTER;
          } else {
            if (index < center - 1)
              subnode.position = this.LEFT;
            else if (index > center)
              subnode.position = this.RIGHT;
            else
              subnode.position = index === center ? this.CENTER_RIGHT :  this.CENTER_LEFT;
          }
        });
        return true;
      });
    this.columns = this.data.reduce((leafs, node) => leafs + (node.isRoot ? Math.max(node.leafs, 1) : 0), 0)
  }
}
