$(function(){

  var template = '<div class="info" />';

  Iframework.NodeBoxNativeView = Backbone.View.extend({
    tagName: "div",
    className: "nativenode",
    template: _.template(template),
    info: {
      title: "native-node-view",
      description: "extend me"
    },
    inputs: {},
    outputs: {},
    initialize: function () {
      this.render();

      // Info
      this.model.infoLoaded(this.info);

      // Ports
      for (var inputname in this.inputs) {
        if (this.inputs.hasOwnProperty(inputname)) {
          var inInfo = this.inputs[inputname];
          inInfo.name = inputname;
          this.model.addInput(inInfo);
        }
      }
      for (var outputname in this.outputs) {
        if (this.outputs.hasOwnProperty(outputname)) {
          var outInfo = this.outputs[outputname];
          outInfo.name = outputname;
          this.model.addOutput(outInfo);
        }
      }

      this.initializeCategory();
      this.initializeModule();

      return this;
    },
    initializeCategory: function(){
      // for example, override in nodes/image.js
    },
    initializeModule: function(){
      // for example, override in nodes/image-combine.js
    },
    render: function () {
      this.$el.html(this.template(this.model));
      return this;
    },
    redraw: function (timestamp) {
      // Do everything that will cause a redraw here
    },
    _triggerRedraw: false,
    renderAnimationFrame: function (timestamp) {
      // Get a tick from GraphView.renderAnimationFrame()
      // this._valueChanged is set by NodeBox.receive()
      if (this._triggerRedraw) {
        this._triggerRedraw = false;
        this.redraw(timestamp);
      }
    },
    send: function (name, value) {
      this.model.send(name, value);
    },
    toString: function() {
      return "Native view: "+this.model.get("id")+": "+this.info.title;
    },
    resize: function(w,h) {
      // Called from NodeBoxView.resizestop()
    },
    connectEdge: function(edge) {
      // Called from Edge.connect();
    },
    disconnectEdge: function(edge) {
      // Called from Edge.disconnect();
    },
    remove: function(){
      // Called from NodeBoxView.remove();
    }

  });

});
