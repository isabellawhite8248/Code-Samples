package sol;

import src.ITreeGenerator;
import src.Row;

import java.util.ArrayList;
import java.util.List;

import java.util.Random;

/**
 * A class that implements the ITreeGenerator interface
 * used to generate a tree
 */
public class TreeGenerator implements ITreeGenerator<Dataset> {
    // TODO: Implement methods declared in ITreeGenerator interface!

    ITreeNode tree;

    public ITreeNode getDecisionTreeHelp(Dataset trainingData, String targetAttribute, List<String> attributes){
        if (attributes.isEmpty()) {
            return new Leaf(trainingData.mostFrequent(targetAttribute));
        }
        else {
            if (trainingData.allSame(targetAttribute)){
                return new Leaf(trainingData.getDataObjects().get(0).getAttributeValue(targetAttribute));
            }

            Random random = new Random();
            int upperBound = attributes.size();
            int randomNum = random.nextInt(upperBound);

            String label = attributes.get(randomNum);
            attributes.remove(label);

            List<Dataset> splitData = trainingData.split(label);

            Node tree = new Node(label);

            tree.setDefVal(trainingData.mostFrequent(targetAttribute));

            for (Dataset dataset : splitData){
                ITreeNode child = this.getDecisionTreeHelp(dataset, targetAttribute, attributes);
                Edge edge = new Edge(dataset.getDataObjects().get(0).getAttributeValue(label), child);
                tree.addChild(edge);
            }

            return tree;
        }
    }

    public void generateTree(Dataset trainingData, String targetAttribute) {
        List<String> attributes = trainingData.getAttributeList();
        attributes.remove(targetAttribute);
        this.tree = this.getDecisionTreeHelp(trainingData, targetAttribute, attributes);
    }

    public String getDecision(Row datum) {
        return null;
    }
}
