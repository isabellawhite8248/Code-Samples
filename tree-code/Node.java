package sol;

import src.IDataset;
import src.Row;

import java.util.ArrayList;
import java.util.List;

public class Node implements ITreeNode{
    String label;
    List<Edge> children;
    String defVal;

    public Node(String label){
        this.label = label;
        this.children = new ArrayList<>();
    }

    public Node(String label, List<Edge> children){
        this.label = label;
        this.children = children;
    }

    public String getDecision(Row forDatum){
        for (Edge edge : this.children){
            if (edge.hasLabel(forDatum.getAttributeValue(this.label))){
                edge.getNode().getDecision(forDatum);
            }
        }
        return this.defVal;
    }

    public void addChild(Edge child){
        this.children.add(child);
    }

    public void setDefVal(String value){
        this.defVal = value;
    }

    public String getDefVal() {
        return this.defVal;
    }
}
