package sol;

/**
 * The class Edge creates a label and a node to traverse to the next node of the tree
 */
public class Edge {
    private String label;
    private ITreeNode tNode;

    /**
     * The edge constructor takes in a label and a node and creates
     * the connector to the next node by grouping together
     * components associated with the target attribute
     * @param label label is a string which labels the edge
     * @param tNode the node illustrates the next node which the edge connects to
     */
    public Edge(String label, ITreeNode tNode){
        this.label = label;
        this.tNode = tNode;
    }

    /**
     * The hasLabel method takes in a string and checks if the label
     * is equivalent to the string
     * @param name the name parameter takes in a string to
     *            compare the label to
     * @return returns true if the label matches the name,
     * and false if it does not
     */
    public boolean hasLabel(String name){
        if (this.label == name) return true;
        else return false;
    }

    /**
     * The get node method returns the node
     * @return returns a tNode to represent the next node
     * the edge connects to
     */
    public ITreeNode getNode(){
        return this.tNode;
    }
}
