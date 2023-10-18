package sol;

import src.IDataset;
import src.Row;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.List;

/**
 * A class that implements the IDataset interface,
 * representing a training data set.
 */
public class Dataset implements IDataset {

    private List<Row> rows;

    public Dataset(List<Row> rows){
        this.rows = rows;
    }

    /**
     * returns a list, method to get the list of attributes
     * @return returns the list of strings in a new arrayList of type string
     */
    public List<String> getAttributeList(){
        if (this.rows.isEmpty()){
            return new ArrayList<String>();
        }

        return (List<String>) this.rows.get(0).getAttributes();
    }

    /**
     * The get data objects returns a list of rows
     * @return returns a list of rows initialized in the constructor
     */
    public List<Row> getDataObjects() {
        return this.rows;
    }

    /**
     * returns the size of the rows
     * @return an integer depicting the size of the the rows array
     */
    public int size() {
        return this.rows.size();
    }

    /**
     * The split function takes in a label and returns a list of type
     * dataset with the target attribute. makes a bucket of type list<Row>
     *  that contains the given attribute
     * @param label the label parameter is a string which contains what the target attribute
     *              is
     * @return returns a sorted list of dataset by the target attribute
     */
    public List<Dataset> split(String label){
        List<Dataset> output = new ArrayList<>();
        while (!this.rows.isEmpty()){
            List<Row> bucket = new ArrayList<>();
            for (Row row : this.rows){
                if (this.rows.get(0).getAttributeValue(label) == row.getAttributeValue(label)){
                    bucket.add(row);
                    this.rows.remove(row);
                }
            }
            Dataset bucketData = new Dataset(bucket);
            output.add(bucketData);
        }
        return output;
    }

    /**
     * the allSame method returns a boolean and checks if the rows are the same
     * important because if they are all the same a leaf needs to be made.
     * @param target the target parameter is a string to check if the attributes of
     *               each row match
     * @return returns a boolean true if it is all the same, false if it is not
     */
    public boolean allSame(String target){
        for (Row row : this.rows){
            if (!(this.rows.get(0).getAttributeValue(target) == row.getAttributeValue(target))){
                return false;
            }
        }
        return true;
    }

    /**
     * The mostFrequent method takes in a target string and
     * decides which attribute is the most frequent among the given
     * data set.
     * @param target the target is a string which indicates the attribute to
     *               measure against
     * @return returns the string of the most frequent attribute
     */
    public String mostFrequent(String target){
        List<String> keys = new ArrayList<>();
        List<Integer> values = new ArrayList<>();

        List<Row> tmpList = new ArrayList<>();
        tmpList.addAll(this.rows);

        while (!tmpList.isEmpty()){
            for (Row row : tmpList){
                keys.add(tmpList.get(0).getAttributeValue(target));
                values.add(0);
                if (tmpList.get(0).getAttributeValue(target) == row.getAttributeValue(target)){
                    values.set(0,values.get(0) + 1);
                    tmpList.remove(row);
                }
            }
        }

        Integer max = -1;
        Integer index = 0;

        for (int i = 0; i < values.size(); i++){
            if (values.get(i) > max){
                max = values.get(i);
                index = i;
            }
        }

        return keys.get(index);

    }
}
