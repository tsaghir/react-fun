import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { css } from 'emotion';
import { pluck, uniq, sort } from 'ramda';
import { Button } from '../../components';
import { fetchCometData } from '../../helpers/dataFetcher';

class BubbleChart extends React.Component {
  state = {
    data: null,
    center: true,
    selectedYear: '',
  };

  componentDidMount() {
    this.getCometData();
    this.renderChart();
  }

  getCometData = async () => {
    const cometData = await fetchCometData();
    this.setState({ data: cometData });
  };

  componentDidUpdate() {
    const { width, height } = this.props;
    if (width !== 0 && height !== 0) {
      this.renderChart();
    }
  }

  render() {
    const { width, height } = this.props;

    return (
      <div className={tooltipStyle}>
        <div className={css({ display: 'inline-block', float: 'left' })}>
          <Button id="centerBtn" buttonText="Center" />
          {this.renderDropdownYear()}
        </div>
        <svg id="bubbleChart" width={width} height={height} />
      </div>
    );
  }

  renderChart = () => {
    const { width, height } = this.props;
    const { data, selectedYear, center } = this.state;

    d3.selectAll('svg > *').remove();

    let svg = d3
      .select('#bubbleChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(0,0)');

    const { minSize, maxSize } = this.getMinMaxCometSize();

    this.radiusScale =
      minSize &&
      maxSize &&
      d3
        .scaleSqrt()
        .domain([minSize, maxSize])
        .range([10, 80]);

    const forceX = () =>
      d3
        .forceX(d => {
          if (d.year === selectedYear) return 1100;
          return 500;
        })
        .strength(0.05);

    const simulation = d3
      .forceSimulation()
      .force('x', center ? d3.forceX(width / 2).strength(0.05) : forceX())
      .force('y', d3.forceY(height / 2).strength(0.05))
      .force('collide', d3.forceCollide(d => this.radiusScale(d.size) + 1));

    data && this.renderBubbles(svg, simulation, data);
  };

  renderBubbles = (svg, simulation, data) => {
    var tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    let circles = svg
      .selectAll('.comets')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'comets')
      .attr('r', d => this.radiusScale(d.size))
      .attr('fill', d => this.setBubbleColor(d));

    d3.select('#centerBtn').on('click', () => this.setState({ center: true }));

    const ticked = () => circles.attr('cx', d => d.x).attr('cy', d => d.y);

    circles
      .append('svg:title')
      .text(
        d =>
          `${d.id} (${d.year})\n\n latitude: ${d.latitude}\n longitude: ${
            d.longitude
          }`,
      )
      .on('mouseover', function() {
        return tooltip.style('visibility', 'visible');
      });

    simulation.nodes(data).on('tick', ticked);
  };

  setBubbleColor = item => {
    const { latitude, longitude } = this.props;

    if (
      latitude - 10 < item.latitude &&
      item.latitude < latitude + 10 &&
      (longitude - 10 < item.longitude && item.longitude < longitude + 10)
    )
      return 'red';
    return 'black';
  };

  getMinMaxCometSize = () => {
    const { data } = this.state;
    const size = data && pluck('size', data);
    if (size) {
      const minSize = 1;
      const maxSize = Math.max.apply(Math, size);

      return { minSize, maxSize };
    }
    return {};
  };

  renderDropdownYear = () => {
    const { data } = this.state;
    if (data) {
      const diff = (a, b) => {
        return a - b;
      };
      const uniqueYears = sort(diff, uniq(pluck('year', data)));

      return (
        <select
          onChange={this.handleSelectChange}
          className={css({
            marginLeft: 15,
            width: 120,
            textAlignLast: 'center',
            height: 45,
            fontFamily: 'Roboto thin',
            outline: 'none',
          })}
        >
          {uniqueYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      );
    }
  };

  handleSelectChange = e =>
    this.setState({ selectedYear: e.target.value, center: false });
}

const mapStateToProps = state => {
  const { currentLocation } = state;
  return currentLocation;
};

export default connect(mapStateToProps)(BubbleChart);

const tooltipStyle = css({
  '& tooltip': {
    position: 'absolute' /*very important*/,
    textAlign: 'left',
    padding: '5px 10px 5px 10px',
    font: 'bold 11px sans-serif',
    color: 'black',
    background: 'yellow',
    borderRadius: 8,
    pointerEvents: 'none',
  },
});
