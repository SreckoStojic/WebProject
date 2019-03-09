package beans;

public class Category {

	private String name;
	private String description;
	private String subcategory;
	
	public Category() {
		// TODO Auto-generated constructor stub
	}

	public Category(String name, String description, String subcategory) {
		super();
		this.name = name;
		this.description = description;
		this.subcategory = subcategory;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSubcategory() {
		return subcategory;
	}

	public void setSubcategory(String subcategory) {
		this.subcategory = subcategory;
	}
	
	

}
