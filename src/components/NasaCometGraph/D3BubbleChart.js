import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import * as d3 from 'd3';

export default class BubbleChart extends React.Component {
  componentDidMount() {
    this.svg = ReactDOM.findDOMNode(this);
    this.graphProps = {
      zoom: 1.1,
      offsetX: -0.05,
      offsetY: -0.01,
    };
    this.renderChart();
  }

  componentDidUpdate() {
    const { width, height } = this.props;
    if (width !== 0 && height !== 0) {
      this.renderChart();
    }
  }

  render() {
    const { width, height } = this.props;

    return <svg id="bubbleChart" width={width} height={height} />;
  }

  renderChart = () => {
    const { width, height } = this.props;
    const margin = { top: 10, right: 20, bottom: 30, left: 50 };
    let correctedWidth = width - margin.left - margin.right;
    let correctedHeight = height - margin.top - margin.bottom;

    const getRandomColor = () => {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    let svg = d3
      .select('#bubbleChart')
      .append('svg')
      .attr('width', correctedWidth + margin.left + margin.right)
      .attr('height', correctedHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.json('https://data.nasa.gov/resource/y77d-th95.json').then(rawData => {
      let data = rawData.map(item => {
        return {
          id: item.name,
          x: item.reclat,
          y: item.reclong,
          size: item.mass,
          year: moment(item.year).format('YYYY'),
        };
      });

      const pack = d3
        .pack()
        .size([1000, 800])
        .padding(5);

      const root = d3
        .hierarchy({ children: data })
        .sum(function(d) {
          return d.size;
        })
        .sort(function(a, b) {
          return Number(b.year) - Number(a.year);
        });

      // Pass the data to the pack layout to calculate the distribution.
      const nodes = pack(root).leaves();

      const color = getRandomColor();
      this.renderBubbles(nodes, svg, color);
    });
  };

  renderBubbles = (nodes, svg) => {
    const bubbleChart = svg;

    const node = bubbleChart
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      })
      .on('click', function(d) {
        // bubbleClickFun(d.year);
      });

    node
      .append('circle')
      .attr('id', function(d) {
        return d.id;
      })
      .attr('r', function(d) {
        return d.r - d.r * 0.04;
      })
      .style('fill', function(d) {
        return d.color;
      })
      .style('z-index', 1)
      .on('mouseover', function(d) {
        d3.select(this).attr('r', d.r * 1.04);
      })
      .on('mouseout', function(d) {
        const r = d.r - d.r * 0.04;
        d3.select(this).attr('r', r);
      });

    const valueFont = {
      family: 'Arial',
      size: 12,
      color: '#fff',
      weight: 'bold',
    };

    node
      .append('text')
      .attr('class', 'value-text')
      .style('font-size', `${valueFont.size}px`)
      .style('font-weight', d => {
        return valueFont.weight ? valueFont.weight : 600;
      })
      .style('font-family', valueFont.family)
      .style('fill', () => {
        return valueFont.color ? valueFont.color : '#000';
      })
      .style('stroke', () => {
        return valueFont.lineColor ? valueFont.lineColor : '#000';
      })
      .style('stroke-width', () => {
        return valueFont.lineWeight ? valueFont.lineWeight : 0;
      })
      .text(function(d) {
        return d.name;
      });
  };
}
