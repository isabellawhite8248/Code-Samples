package sol;
/*
The leaf class creates a new leaf which takes in the label as a parameter and contains a get decision
label to return the decision for that edge of the tree.
 */
import src.IDataset;
import src.Row;

import java.util.ArrayList;
import java.util.List;

/**
 * The constructor for the lead class, implements the ITreeNode Interface
 */
public class Leaf implements ITreeNode{

    String label;

    /**
     * The constructor for the leaf
     * @param label takes in a string for the label of the leaf
     */
    public Leaf(String label){
        this.label = label;
    }

    /**
     * The get decision method takes in a row forDatum and
     * returns the label of the leaf
     * @param forDatum the datum to lookup a decision for
     * @return the label in the form of a string that tells
     * what the "decision" of that specific edge is
     */
    public String getDecision(Row forDatum){
        return this.label;
    }
}
