import {Node, Parent} from 'unist'
import {convert} from 'unist-util-is'
import './tree.scss'

const isParent = convert((node): node is Parent => 'children' in node)

const omit = <O extends object, Key extends string>(
  o: O,
  keys: Key[],
): Omit<O, Key> => {
  return Object.fromEntries(
    Object.entries(o).filter(([oKey]) => !(keys as string[]).includes(oKey)),
  ) as Omit<O, Key>
}

const Property = ({property, value}: {property: string; value: any}) => {
  if (!value) return null

  if (typeof value === 'object') {
    return (
      <details>
        <summary>{property}</summary>
        <div>
          {Object.entries(value).map(([property, value]) => (
            <Property key={property} property={property} value={value} />
          ))}
        </div>
      </details>
    )
  }

  return (
    <div>
      {property}: {typeof value === 'string' ? `"${value}"` : value}
    </div>
  )
}

const Node = ({node, isRoot}: {node: Node; isRoot?: boolean}) => {
  const {type} = node
  const properties = Object.entries(omit(node, ['children', 'type']))

  const children = isParent(node)
    ? node.children.map((child) => <Node key={child.type} node={child} />)
    : undefined

  return (
    <details open={isRoot}>
      <summary>{type}</summary>

      {children && (
        <details>
          <summary>children</summary>
          {children}
        </details>
      )}
      {properties.map(([property, value]) => (
        <Property key={property} property={property} value={value} />
      ))}
    </details>
  )
}

export const Tree = ({node}: {node: Node}) => {
  return (
    <div className="tree">
      <Node node={node} isRoot />
    </div>
  )
}
