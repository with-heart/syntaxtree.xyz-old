import {CSSProperties} from 'react'

export default function IndexPage() {
  return (
    <div
      className="wrapper center region flow | min-h-screen text-center"
      style={
        {
          '--wrapper-max-width': '60ch',
        } as CSSProperties
      }
    >
      <header>
        <h1>syntaxtree.xyz</h1>
      </header>
      <main>
        <p>
          A site dedicated to exploring the infinite universe of syntax trees
        </p>
      </main>
      <footer>
        a <a href="https://with-heart.xyz/">with-heart</a> project
      </footer>
    </div>
  )
}
