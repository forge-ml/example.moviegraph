import { useEffect, useState } from 'react'
import './App.css'
import forge from "../forge/client";
import { ForceGraph2D } from 'react-force-graph';

interface Relationship {
  from: string;
  to: string;
  type: string;
}

interface GraphData {
  nodes: { id: string; name: string; alignment: "good" | "evil" }[];
  links: { source: string; target: string; type: string }[];
}

async function generateRelationships(movie: string) {
  const relations = await forge.relations.query(
    `describe the relationships between the characters in the movie ${movie}`
  );

  return relations;
}

function App() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [bookTitle, setBookTitle] = useState<string>('');

  const fetchRelations = async (movie: string) => {
    const relations = await generateRelationships(movie);
    const characters = new Set(relations.characters);
    const nodes = Array.from(characters).map(char => ({ id: char.name, name: char.name, alignment: char.alignment }));
    const links = relations.relationships.map((rel: Relationship) => ({
      source: rel.from,
      target: rel.to,
      type: rel.type
    }));
    setGraphData({ nodes, links });
  };

  useEffect(() => {
    fetchRelations("harry potter");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookTitle.trim()) {
      fetchRelations(bookTitle);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeId="id"
        nodeLabel="name"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name as string;
          const fontSize = 12 / globalScale;
          ctx.fillStyle = node.alignment === 'good' ? '#90EE90' : '#FF6347';
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI);
          ctx.fill();
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, node.x!, node.y!);
        }}
        linkLabel="type"
        linkColor={() => 'rgba(255,255,255,0.8)'}
        linkWidth={1.5}
        linkCanvasObject={(link, ctx, globalScale) => {
          const start = link.source as any;
          const end = link.target as any;
          const textPos = {
            x: start.x + (end.x - start.x) * 0.5,
            y: start.y + (end.y - start.y) * 0.5
          };
          const relLink = link as any;
          const label = relLink.type;
          const fontSize = 1.5 + 0.5 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, textPos.x, textPos.y);
        }}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        backgroundColor="#333333"
        width={window.innerWidth}
        height={window.innerHeight}
        nodeCanvasObjectMode={() => 'after'}
        linkCanvasObjectMode={() => 'after'}
      />
      <form onSubmit={handleSubmit} style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          type="text"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          placeholder="Enter movie title"
          style={{ padding: '5px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '5px 10px', fontSize: '16px' }}>
          Generate Graph
        </button>
      </form>
    </div>
  )
}

export default App