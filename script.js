// We start by creating empty lists for nodes (topics) and edges (connections)
let nodes = new vis.DataSet([]);
let edges = new vis.DataSet([]);
let container = document.getElementById("network");

// Data and options for the vis.js network
let data = {
  nodes: nodes,
  edges: edges,
};

let options = {
  interaction: { hover: true },
  physics: {
    stabilization: false,
    barnesHut: { springLength: 100 },
  },
};

// Create the network (the interactive map)
let network = new vis.Network(container, data, options);

let nodeId = 1;  // Used for giving each node a unique ID
let selectedNodes = [];  // To store nodes when connecting

// Function to add a new node when you click "Add Node"
function addNode() {
    const label = document.getElementById("node-label").value;
    const color = document.getElementById("node-color").value;
    if (label) {
      nodes.add({ id: nodeId, label, color: { background: color } });
      nodeId++;
      document.getElementById("node-label").value = "";
    }
  }
  
  
// Function to add an edge (connection) between two nodes
function addEdge() {
  if (selectedNodes.length !== 2) {
    alert("Select exactly two nodes to connect!");
    return;
  }
  edges.add({ from: selectedNodes[0], to: selectedNodes[1] });
  selectedNodes = [];  // Reset selection after connecting
}

// When you click on a node, store it so you can choose two to connect
network.on("selectNode", function (params) {
  if (selectedNodes.length < 2) {
    selectedNodes.push(params.nodes[0]);
  } else {
    // If already two are selected, start a new selection with the clicked one.
    selectedNodes = [params.nodes[0]];
  }
});
network.on("doubleClick", function (params) {
    if (params.nodes.length === 1) {
      const nodeIdToEdit = params.nodes[0];
      const currentLabel = nodes.get(nodeIdToEdit).label;
      const newLabel = prompt("Edit topic name:", currentLabel);
      if (newLabel) {
        nodes.update({ id: nodeIdToEdit, label: newLabel });
      }
    }
  });
  function downloadMap() {
    const networkContainer = document.getElementById("network");
    html2canvas(networkContainer).then(canvas => {
      const link = document.createElement("a");
      link.download = "concept-map.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  function saveMap() {
    const mapData = {
      nodes: nodes.get(),
      edges: edges.get(),
      nodeId: nodeId
    };
    try {
      localStorage.setItem("conceptMapData", JSON.stringify(mapData));
      alert("✅ Map saved successfully!");
    } catch (e) {
      alert("❌ Save failed: " + e);
    }
  }
  
  function loadMap() {
    const savedData = localStorage.getItem("conceptMapData");
    if (!savedData) {
      alert("⚠️ No saved map found.");
      return;
    }
  
    try {
      const mapData = JSON.parse(savedData);
      nodes.clear();
      edges.clear();
      nodes.add(mapData.nodes);
      edges.add(mapData.edges);
      nodeId = mapData.nodeId || mapData.nodes.length + 1;
  
      // Re-render network with new data
      network.setData({ nodes, edges });
  
      alert("✅ Map loaded!");
    } catch (e) {
      alert("❌ Load failed: " + e);
    }
  }
  function deleteSelectedNode() {
    const selection = network.getSelectedNodes();
    if (selection.length === 0) {
      alert("Please select a node to delete.");
      return;
    }
  
    const nodeIdToDelete = selection[0];
    nodes.remove({ id: nodeIdToDelete });
  
    // Also remove all edges connected to this node
    const connectedEdges = edges.get({
      filter: edge => edge.from === nodeIdToDelete || edge.to === nodeIdToDelete
    });
  
    edges.remove(connectedEdges);
  }
  
  function runOCR() {
    const imageInput = document.getElementById("map-image");
    if (!imageInput.files.length) {
      alert("Please select an image first.");
      return;
    }
  
    const imageFile = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      console.log("Image data:", reader.result); // ADD THIS
      Tesseract.recognize(
        reader.result,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        alert("🧠 Extracted text:\n\n" + text);
    
      });
    };
    
    reader.onload = function () {
      Tesseract.recognize(
        reader.result,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        alert("🧠 Extracted text:\n\n" + text);
        // OPTIONAL: Split and add each line as a node
        const lines = text.split('\n').filter(line => line.trim() !== '');
        lines.forEach(label => {
          nodes.add({ id: nodeId, label: label.trim(), color: { background: "#ffd966" } });
          nodeId++;
        });
      });
    };
  
    reader.readAsDataURL(imageFile);
  }
  