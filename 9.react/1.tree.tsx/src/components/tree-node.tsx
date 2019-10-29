import React from "react";
import { TreeData } from "../typings";
import file from "../assets/file.png";
import closedFolder from "../assets/closed-folder.png";
import openedFolder from "../assets/opened-folder.png";
import loadingSrc from "../assets/loading.png";

interface Collapse{
  (key:string): void;
}

interface Props{
  data: TreeData;
  onCollapse: Collapse;
  onCheck: Collapse;
}

class TreeNode extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    let { data: { name, children, key, collapsed, checked, loading}, onCollapse, onCheck } = this.props;
    let caret = null;
    let icon = null;
    if (children) {
      if (children.length > 0) {
        caret = (
          <span
            className={`collapse ${collapsed ? 'caret-right' : 'caret-dwon'}`}
            onClick={()=> onCollapse(key)}
          ></span>
          )
          icon = collapsed ? closedFolder : openedFolder;
      } else {
        caret = null;
        icon = file;
      }
    } else {
      caret = (
        loading ? <img
          src={loadingSrc} 
          className='collapse'
          style={{width: 14, top: '50%', marginTop: -7}}/> :
          <span onClick={() => onCollapse(key)}></span>
      );
      icon = closedFolder;
    }
    return (
      <div className='tree-node'>
        <div className='inner'>
          {caret}
          <span className="content">
              <span className="checkbox">
              <input type="checkbox"  checked={checked} onChange={() => onCheck(key)}/>
              <img style={{ width: 20}} src={icon}/>
              {name}
            </span>
          </span>
        </div>
        {
          (children && children.length > 0 && !collapsed) && (
            <div className='children'>
              {
                children.map((item:TreeData) => {
                  <TreeNode
                    onCollapse={this.props.onCollapse}
                    data={item}
                    onCheck={onCheck}
                    key={item.key}
                  />
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}

export default TreeNode;