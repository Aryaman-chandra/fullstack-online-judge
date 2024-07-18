import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useQuery } from '@tanstack/react-query';
import { getGraph } from '@/lib/api';
import { Loader } from '@/lib/utils/loader';

const ForceGraph = () => {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const [key, setKey] = useState(0);

  const fetchGraph = async () => {
    const data = await getGraph(); 
    console.log(data);
    return data;
  }

  const { data, isPending } = useQuery({
    queryKey: ["GraphData"],
    queryFn: fetchGraph,
  });

  useEffect(() => {
    if (!data) return;

    const svgElement = svgRef.current;
    const { width, height } = svgElement.getBoundingClientRect();

    const svg = d3.select(svgElement)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // Clear SVG content before redrawing

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("radial",d3.forceRadial(50, width / 2, height / 2));

    simulationRef.current = simulation;

    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("class", "stroke-gray-400 stroke-[4px]");

    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("class", "fill-primary ")
      .attr("r", 10)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

    function handleMouseOver(event, d) {
      const node = d3.select(this);
      node.raise().transition()
        .duration(300)
        .attr("r", 15);
      
      svg.append("text")
        .attr("id", "hover-text")
        .attr("x", d.x)
        .attr("y", d.y + 25)
        .attr("text-anchor", "middle")
        .attr("class" , "fill-gray-500")
        .attr("font-size", "22px")
        .text(d.title);
    }

    function handleMouseOut(event, d) {
      d3.select(this).transition()
        .duration(300)
        .attr("r", 10);
      
      svg.select("#hover-text").remove();
    }

    function handleClick(event, d) {
      window.open(`/problems/${d.id}`, '_blank');
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, key]);

  // Effect to restart simulation on page load/refresh
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && simulationRef.current) {
        simulationRef.current.alpha(1).restart();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Restart simulation on mount
    if (simulationRef.current) {
      simulationRef.current.alpha(1).restart();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  if (isPending) return <Loader isLoading={isPending} />;

  return (
    <div className="w-full h-screen bg-background relative  rounded-md border hover:ring  transition ease-out duration-300 hover:ring-primary">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default ForceGraph;
