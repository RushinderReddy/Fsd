package fms.repository;

import fms.model.Feedback;
import fms.model.Product;
import fms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByProduct(Product product);
    List<Feedback> findByUser(User user);
    Optional<Feedback> findByProductAndUser(Product product, User user);
    
    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.product = ?1")
    Float calculateAverageRatingForProduct(Product product);
}